import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '../css/giveme.css'
function Readme() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!");

  const handleEditorChange = (value) => {
    setMarkdown(value);
  };

  return (
    <>
      <img className ="logo" src="logo.png" alt="환영합니다" />
      <div className="readme-container">
        <MDEditor
          height={700} // 높이 설정
          value={markdown}
          onChange={handleEditorChange}
        />
      </div>
      <div className='grid_div'>
        <div className='save_box'>Save</div>
        <div className='commit_box'>Commit to repository</div>
      </div>
    </>
  );
}

export default Readme;
