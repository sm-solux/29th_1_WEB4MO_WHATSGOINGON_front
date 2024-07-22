import React from 'react';
import { useNavigate } from 'react-router-dom';
import './q_2.css';
import WGO from '../../assets/icons/whats_going_on.svg';

const Q_2_6: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    { name: '야구', path: '/q_2/q_3' },
    { name: '해외 야구', path: '/q_2/q_3' },
    { name: '축구', path: '/q_2/q_3' },
    { name: '해외 축구', path: '/q_2/q_3' },
    { name: '농구', path: '/q_2/q_3' },
    { name: '배구', path: '/q_2/q_3' }
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="q2-app-container">
      <div className="q2-heading">
        <h6>
          <img src={WGO} alt="WGO" />&nbsp;What's going on
        </h6>
      </div>
      <div className="q2-content">
        <h5>관심 분야 테스트</h5>
        <div className="q2-bar"></div>
        <h1>Q. 2</h1>
        <h3>스포츠 분야를 선택하셨네요!<br></br>더 관심 있는 키워드가 있을까요?</h3>    
        <button className="q2-prev-button">&lt;</button> 
        <button className="q2-next-button">&gt;</button>
        <div className="q2-button-grid-6">
          {topics.map((topic, index) => (
            <button key={index} className="q2-topic-button" onClick={() => handleClick(topic.path)}>
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Q_2_6;
