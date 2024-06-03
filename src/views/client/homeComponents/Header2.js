import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Header2.css';

function Header2({ onDataUpdate  }) {
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    fetchQuestions();
    console.log('response',onDataUpdate);
  }, [activeFilter]);

  const fetchQuestions = async () => {
    try {
      let response;
      if (activeFilter === 'answered') {
        response = await axios.get('http://localhost:8082/api/questions/questionsWithAnswers');
      } else if (activeFilter === 'unanswered') {
        response = await axios.get('http://localhost:8082/api/questions/questionsWithoutAnswers');
      } else if (activeFilter === 'votes') {
        response = await axios.get('http://localhost:8082/api/questions/votes');
      }

      const questions = response.data;
      console.log('response',response.data);
      onDataUpdate(questions); // Envoyer les données mises à jour au parent
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
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
          <p>{}Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <NavLink

                
                className={`main-tab ${activeFilter === 'answered' ? 'active-tab' : ''}`}
                onClick={() => handleFilterChange('answered')}
                activeClassName="active-tab"
              >
                Answered
              </NavLink>
              <NavLink
                
                className={`main-tab ${activeFilter === 'votes' ? 'active-tab' : ''}`}
                onClick={() => handleFilterChange('votes')}
                activeClassName="active-tab"
              >
                Votes
              </NavLink>
              <NavLink
                
                className={`main-tab ${activeFilter === 'unanswered' ? 'active-tab' : ''}`}
                onClick={() => handleFilterChange('unanswered')}
                activeClassName="active-tab"
              >
                Unanswered
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default Header2;
