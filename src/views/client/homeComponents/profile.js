import React, { useState } from 'react';
import './profile.css';


function Profile() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="avatar.png" alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h2>saaaa</h2>
          <p>User since Apr 2024</p>
          <p>Points: 0</p>
        </div>
      </div>

      <div className="profile-content">
        <h3>Analysis</h3>
        <h3>Questions</h3>
        <h3>Answers</h3>

        <div className="filter-section">
          <p>Find your questions between:</p>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <span>To</span>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <p>and in tag:</p>
          <select value={selectedTag} onChange={handleTagChange}>
            <option value="">Select a tag</option>
            <option value="tag1">Tag 1</option>
            <option value="tag2">Tag 2</option>
            {/* Add more tag options here */}
          </select>
        </div>

        {/* Display questions based on filters here */}
      </div>
    </div>
  );
}

export default Profile;
