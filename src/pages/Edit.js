import React, { useState,useEffect } from 'react';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import Modal from './Modal';
import '../css/giveme.css';

function Edit() {
  const [markdown, setMarkdown] = useState("# Hello!");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태 추가
  const readmeId = localStorage.getItem("readmeId");

  let repositoryName = localStorage.getItem("repository");
  console.log(repositoryName);
  useEffect(() => {
    const saveCommit = async () => {
        const userToken = localStorage.getItem('refreshToken');
        try {
          const response = await axios.get(`http://3.39.11.243:8080/api/readme/${readmeId}`, {
              headers: {
                  Authorization: `Bearer ${userToken}`
              }
          });
            console.log(response); // 서버로부터 받은 응답 데이터 처리
            setMarkdown(response.data.content);

          } catch (error) {
            if (error.response) {
                console.error("서버 응답 오류:", error.response.data);
            } else if (error.request) {
                console.error("서버 요청 오류:", error.request);
            } else {
                console.error("오류 메시지:", error.message);
            }
            alert("에러가 발생했습니다. 상세 오류 내용은 콘솔을 확인해주세요.");
            throw error; // 예외 처리
        }
    };

    saveCommit(); // useEffect가 실행될 때 saveCommit 함수 호출
}, []); // 빈 배열을 두 번째 매개변수로 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행


  const handleEditorChange = (value) => {
    setMarkdown(value);
  };

  const openModal = () => {
    setIsModalOpen(true); // 모달 창 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 창 닫기
  };

  const add = () => {
    openModal(); // Add 버튼을 누르면 모달 창 열기
  };

  const addTeamInfoToMarkdown = (day, introduce, teamMembers) => {
    // 기존 마크다운 분할을 위한 정규식
    const regex = /\n##/;

    // 기존 마크다운을 분할하여 배열에 저장
    const parts = markdown.split(regex);

    // 새로운 내용 구성
    let newContent = `\n## 📅개발기간\n${day}\n\n`;
    newContent += `## 👥팀원소개\n### ${introduce}\n\n`;
    teamMembers.forEach((member, index) => {
      newContent += `${index + 1}. **이름:** ${member.name}\n`;
      newContent += `   - **학교:** 🏫${member.school}\n`;
      newContent += `   - **역할:** 🌐${member.role}\n`;
    });

    // 새로운 내용과 기존 마크다운의 나머지 부분을 합쳐서 새로운 마크다운 생성
    const newMarkdown = parts[0] + newContent + '\n##' + parts.slice(1).join('\n##');

    setMarkdown(newMarkdown);
  };
  const commit = async () => {
    const userToken = localStorage.getItem('refreshToken');

    try {
      const requestBody = {
        //토큰 있어야함.
        repositoryName: repositoryName,
        content: markdown
      };
      const response = await axios.post('http://3.39.11.243:8080/api/readme/commit', requestBody, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      console.log(response); // 서버로부터 받은 응답 데이터 처리
      alert("커밋완료");

      return response.data; // 선택적으로 응답 데이터 반환
    } catch (error) {
      console.error('Error while posting commit:', error);
      throw error; // 예외 처리
    }
  };
  const edit = async () => {
    const userToken = localStorage.getItem('refreshToken');
    const requestBody={
      readmeId : readmeId,
      content : markdown
    };
    try {
        const response = await axios.patch(`http://3.39.11.243:8080/api/readme/${readmeId}`, requestBody,{
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        console.log(response); // 서버로부터 받은 응답 데이터 처리
        alert("수정 완료");
        return response.data; // 선택적으로 응답 데이터 반환
    } catch (error) {
        if (error.response) {
            console.error("서버 응답 오류:", error.response.data);
        } else if (error.request) {
            console.error("서버 요청 오류:", error.request);
        } else {
            console.error("오류 메시지:", error.message);
        }
        alert("이미 저장되었습니다."); // 에러 발생 시 alert만 띄우기
         // 예외 처리
    }
};

  return (
    <>
      <img className="logo" src="logo.png" alt="환영합니다" />
      <div className="readme-container">
        <MDEditor
          height={700} // 높이 설정
          value={markdown}
          onChange={handleEditorChange}
        />
      </div>
      <div className='grid_div'>
        <div className='add_box' onClick={add}>Add</div>
        <div className='save_box' onClick={edit}>Edit</div>
        <div className='commit_box' onClick={commit}>Commit to repository</div>
      </div>
      <Modal closeModal={closeModal} isOpen={isModalOpen} addTeamInfoToMarkdown={addTeamInfoToMarkdown}></Modal>
    </>
  );
}

export default Edit;
