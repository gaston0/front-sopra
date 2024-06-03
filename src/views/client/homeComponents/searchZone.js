import React, { useState } from 'react';

import Select from 'react-select';

      

const SearchZone = () => {
  const [title, setTitle] = useState('');

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  const usersOptions = [
    { value: 'user1', label: 'User 1' },

    { value: 'user2', label: 'User 2' },

    // Add more users here
  ];

  const tagsOptions = [
    { value: 'tag1', label: 'Tag 1' },

    { value: 'tag2', label: 'Tag 2' },

    // Add more tags here
  ];

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission

    // Implement the search logic here

    console.log('Title:', title);

    console.log('Selected Users:', selectedUsers);

    console.log('Selected Tags:', selectedTags);
  };

  return (
    <form
      className="d-flex me-auto search-form"
      onSubmit={handleSearch}
      style={{ width: '600px', flexDirection: 'column' }}
    >
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
        className="form-control me-2"
        id="searchQue"
        aria-label="Search"
      />

      <Select
        isMulti
        name="users"
        options={usersOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Users"
        onChange={setSelectedUsers}
        value={selectedUsers}
        style={{ marginBottom: '10px' }}
      />

      <Select
        isMulti
        name="tags"
        options={tagsOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Tags"
        onChange={setSelectedTags}
        value={selectedTags}
        style={{ marginBottom: '10px' }}
      />

      <button className="btn btn-outline-danger" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchZone;
