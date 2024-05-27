import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Header2.css';

function Header2({ onDataUpdate, onAllQuestionsClick }) {
  const [questions, setQuestions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [activeFilter]);

  const fetchQuestions = async () => {
    try {
      let response;
      if (activeFilter === 'answered') {
        response = await axios.get('http://localhost:8080/api/questions/questionsWithAnswers');
      } else if (activeFilter === 'unanswered') {
        response = await axios.get('http://localhost:8080/api/questions/questionsWithoutAnswers');
      } else if (activeFilter === 'votes') {
        response = await axios.get('http://localhost:8080/api/questions/votes');
      }

      if (response) {
        // Extract question IDs
        const questionIds = response.data.map(question => question.id);

        // Fetch user details for each question
        const questionsWithUsernames = await Promise.all(questionIds.map(async (questionId) => {
          const questionResponse = await axios.get(`http://localhost:8080/api/questions/${questionId}`);
          return questionResponse.data;
        }));

        setQuestions(questionsWithUsernames);
        onDataUpdate(questionsWithUsernames);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleFilterChange = (filter) => {
    if (filter === activeFilter) {
      onAllQuestionsClick();
      setActiveFilter('');
      return;
    }
    setActiveFilter(filter);
  };

  const activeTabStyle = {
    backgroundColor: '#cf022b',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none'
  };

  const tabStyle = {
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#000'
  };

  return (
    <div className="main" style={{ marginTop: '70px', width: 'auto' }}>
      <div className="main-container">
        <div className="main-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: '0', marginRight: 'auto' }}>All Questions</h2>
          <NavLink to="/client/askquestion">
            <button className="btn" style={{ marginRight: '20px', backgroundColor: '#cf022b', color: '#fff' }}>
              Ask Question
            </button>
          </NavLink>
        </div>
        <div className="main-desc">
          <p>Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <NavLink
                className={`main-tab ${activeFilter === 'answered' ? 'active-tab' : ''}`}
                style={activeFilter === 'answered' ? activeTabStyle : tabStyle}
                onClick={() => handleFilterChange('answered')}
                activeClassName="active-tab"
              >
                Answered
              </NavLink>
              <NavLink
                className={`main-tab ${activeFilter === 'unanswered' ? 'active-tab' : ''}`}
                style={activeFilter === 'unanswered' ? activeTabStyle : tabStyle}
                onClick={() => handleFilterChange('unanswered')}
                activeClassName="active-tab"
              >
                Unanswered
              </NavLink>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Header2;
