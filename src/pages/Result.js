import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Modal from './Modal';
import '../css/giveme.css'

function Readme() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태 추가

  const handleEditorChange = (value) => {
    setMarkdown(value);
  };

  const openModal = () => {
    setIsModalOpen(true); // 모달 창 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 창 닫기
  };

  const add =() => {
    openModal(); // Add 버튼을 누르면 모달 창 열기
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
        <div className='save_box'>Save</div>
        <div className='commit_box'>Commit to repository</div>
      </div>
      <Modal closeModal={closeModal} isOpen={isModalOpen}></Modal>
      
    </>
  );
}

export default Readme;
