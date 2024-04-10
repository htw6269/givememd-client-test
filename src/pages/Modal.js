import React, { useState } from 'react';

function Modal({ closeModal, isOpen, addTeamInfoToMarkdown }) {
  const [teamMembers, setTeamMembers] = useState([
    { name: '', school: '', role: '' } // 초기 팀원 정보
  ]);
  const [day, setDay] = useState("");
  const [introduce, setIntroduce] = useState("");

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', school: '', role: '' }]);
  };

  const handleDay = (e) => {
    setDay(e.target.value);
  };

  const handleIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index][name] = value;
    setTeamMembers(newTeamMembers);
  };

  const handleConfirm = () => {
    addTeamInfoToMarkdown(day, introduce, teamMembers);
    closeModal();
  };

  return (
    <div className={`modal ${isOpen ? '' : 'hidden'}`}>
      <div className="modal-content">
        <img onClick={closeModal} className="close" src="close.png" alt="Close" />
        <div className='model_grid'>
          <div className="modal_text">개발기간</div>
          <input style={{ fontSize: '18px' }} onChange={(e) => handleDay(e)}></input>
        </div>
        <div className='model_grid'>
          <div className="modal_text">팀원소개</div>
          <input style={{ fontSize: '18px' }} onChange={(e) => handleIntroduce(e)}></input>
        </div>
        {teamMembers.map((member, index) => (
          <div className="modal_team" key={index}>
            <div className='modelTeam_grid'>
              <div className="modal_text">이름</div>
              <input
                style={{ width: '150px', fontSize: '18px' }}
                name="name"
                value={member.name}
                onChange={(e) => handleChange(index, e)}
              />
              {index === teamMembers.length - 1 && (
                <img
                  onClick={addTeamMember}
                  style={{ width: '35px', height: '35px', marginRight: '30px', cursor: 'pointer', fontSize: '18px' }}
                  src="add.png"
                  alt="Add"
                />
              )}
            </div>
            <div className='model_grid'>
              <div className="modal_text">학교</div>
              <input
                style={{ width: '200px', fontSize: '18px' }}
                name="school"
                value={member.school}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className='model_grid'>
              <div className="modal_text">역할</div>
              <input
                style={{ fontSize: "18px" }}
                name="role"
                value={member.role}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="confirm_box" onClick={handleConfirm}>Confirm</div>
    </div>
  );
}

export default Modal;
