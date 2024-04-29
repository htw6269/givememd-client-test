import React, { useState } from 'react';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import Modal from './Modal';
import '../css/giveme.css';

function Readme() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태 추가
  let repositoryName = localStorage.getItem("repository");
  console.log(repositoryName);

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
  const save = async () => {
    const userToken = localStorage.getItem('refreshToken');
    try {
      const requestBody = {
        //토큰 있어야함.
        name: repositoryName,
        content: markdown
      };
      const response = await axios.post('http://3.39.11.243:8080/api/readme/save', requestBody, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      console.log(response); // 서버로부터 받은 응답 데이터 처리
      alert("저장 완료");
      return response.data; // 선택적으로 응답 데이터 반환
    } catch (error) {
      console.error('Error while posting commit:', error);
      throw error; // 예외 처리
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
        <div className='save_box' onClick={save}>Save</div>
        <div className='commit_box' onClick={commit}>Commit to repository</div>
      </div>
      <Modal closeModal={closeModal} isOpen={isModalOpen} addTeamInfoToMarkdown={addTeamInfoToMarkdown}></Modal>
    </>
  );
}

export default Readme;
