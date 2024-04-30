import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader,PulseLoader } from 'react-spinners';
import MDEditor from '@uiw/react-md-editor';
import Modal from './Modal';
import '../css/giveme.css';

function Readme() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  let repositoryName = localStorage.getItem("repository");
  
  useEffect(() => {
    const saveCommit = async () => {
      const userToken = localStorage.getItem('refreshToken');
      const requestBody={
        name : repositoryName
      }
      try {
        const response = await axios.post(`http://3.39.11.243:8080/api/readme`,requestBody, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        console.log(response); // 서버로부터 받은 응답 데이터 처리
        setMarkdown(response.data.content);
        setIsLoading(false); // API 요청 완료 후 로딩 상태 변경

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
    // 커밋 관련 코드
  };

  const save = async () => {
    // 저장 관련 코드
  };

  return (
    <>
      {isLoading ? ( // 로딩 상태에 따라 로딩 화면 렌더링
        <div className='loading_div'>
          <div className='loading_text'>Readme 파일을 만들고 있습니다. 잠시만 기다려주세요.</div>
          <PulseLoader
            className='loading'
            size={60}
            color='#ffa500'
            margin={5}
          />
        </div>
      ) : (
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
            <div className='save_box' onClick={save}>Save</div>
            <div className='commit_box' onClick={commit}>Commit to repository</div>
          </div>
          <Modal closeModal={closeModal} isOpen={isModalOpen} addTeamInfoToMarkdown={addTeamInfoToMarkdown}></Modal>
        </>
      )}
    </>
  );
}

export default Readme;
