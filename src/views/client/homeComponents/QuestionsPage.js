import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import NewNavbar from './NewNavbar';
import Header2 from './Header2';
import { Link } from 'react-router-dom';
import Pagination from './pagination';
import '../homeComponents/QuestionsPage.css';
import axios from 'axios';

const QuestionStat = styled.div`
  text-align: center;
  display: inline-block;
  font-size: 1.2rem;
  color: #aaa;
  margin-top: 6px;
  span {
    font-size: 0.7rem;
    display: block;
    font-weight: 300;
    margin-top: 4px;
  }
`;

const QuestionTitleArea = styled.div`
  padding: 0px 30px;
`;

const Tag = styled.span`
  display: inline-block;
  margin-right: 5px;
  background-color: rgb(0 0 0 / 10%);
  color: #000000;
  padding: 7px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const QuestionLink = styled(Link)`
  text-decoration: none;
  color: #bc1434;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 5px;
`;

const WhoAndWhen = styled.div`
  display: inline-block;
  color: #aaa;
  font-size: 0.8rem;
  float: right;
  padding: 10px 0;
`;

const UserLink = styled.a`
  color: #bc1434;
`;

const StyledQuestionRow = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 50px) 1fr;
  border: 1px solid #dc3545;
  margin-bottom: 20px;
`;

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [postPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);
  const [questionDatas, setQuestionData] = useState([]);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const votreToken = localStorage.getItem('token');
  const handlePageChange = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  const fetchAllQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/questions/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '',
          content: '',
          userId: null,
          tags: [],
          pageIndex: 0,
          pageSize: 40,
          userAnonymous: null,
        }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setQuestionData(data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('There was an error fetching questions:', error);
    }
  };
  useEffect(() => {
    fetchAllQuestions();
  }, [votreToken]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = questionDatas.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => setcurrentPage(pageNum);

  const handleDataFromChild = (data) => {
    setQuestionData(data);
  };

  const handleAllQuestionsClick = async () => {
    try {
      // Fetch all questions again
      const response = await fetch('http://localhost:8080/api/questions/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '',
          content: '',
          userId: null,
          tags: [],
          pageIndex: 0,
          pageSize: 40,
          userAnonymous: null,
        }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setQuestionData(data);
      } else {
        console.error('Data is not an array:');
      }
    } catch (error) {
      console.error('There was an error fetching questions:', error);
    }
  };

  // fonction pour avoi la liste of tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tags/getAll', {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        setTags(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tags :', error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users', {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message);
      }
    };

    fetchTags();
    fetchUsers();
  }, []);

  const handleSearch = async () => {
    const requestData = {
      content: '',
      pageIndex: 0,
      pageSize: 40,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      title: searchTitle ? searchTitle : undefined,
      userAnonymous: selectedUser === '',
      userId: selectedUser ? parseInt(selectedUser, 10) : undefined,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/questions/all', requestData, {
        headers: {
          Authorization: `Bearer ${votreToken}`,
        },
      });
      console.log('Résultats de la recherche :', response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error.message);
    }
  };

  const handleTagChange = (event) => {
    const options = event.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setSelectedTags(selectedOptions);
  };
  return (
    <>
      <NewNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header2
            onDataUpdate={handleDataFromChild}
            onAllQuestionsClick={handleAllQuestionsClick}
          />{' '}
          <>
            <div
              className="filter-container"
              style={{
                borderTop: 'solid 1px gray',
                borderRight: 'solid 1px gray',
                borderLeft: 'solid 1px gray',
                paddingBottom: '20px',
                paddingTop: 10,
              }}
            >
              <div className="filter-item" style={{ marginLeft: '5px' }}>
                <span style={{ color: '#000000' }}>Titre :</span>
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Rechercher par titre..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  style={{ height: '35px' }}
                />
              </div>
              <div className="filter-item">
                <span style={{ color: '#000000' }}>Utilisateurs :</span>
                <select
                  id="userSelect"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Aucun</option>
                  {users.map((user) => (
                    <option key={user.matricul} value={user.matricul}>
                      {user.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <span style={{ color: '#000000' }}>Tags :</span>
                <select id="tagsSelect" value={selectedTags} onChange={handleTagChange}>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <button
                  onClick={handleSearch}
                  className="btn btn-outline-danger"
                  style={{
                    marginRight: '20px',
                    marginLeft: '30px',
                    marginTop: '23px',
                  }}
                >
                  Rechercher
                </button>
              </div>
            </div>
            {error && <p>{error}</p>}
            {currentPosts &&
              currentPosts.map((question, index) => (
                <StyledQuestionRow key={index}>
                  <QuestionStat>
                    {typeof question.votes === 'number' ? question.votes : 0}
                    <span>votes</span>
                  </QuestionStat>
                  <QuestionStat>
                    {typeof question.answers === 'number' ? question.answers : 0}
                    <span>answers</span>
                  </QuestionStat>
                  <QuestionStat>
                    {typeof question.views === 'number' ? question.views : 0}
                    <span>views</span>
                  </QuestionStat>
                  <QuestionTitleArea>
                    <QuestionLink to={`/client/question/${question.id}`}>
                      {question.title || 'No title'}
                    </QuestionLink>
                    <div>
                      {question.tags &&
                        question.tags.map((tag, tagIndex) => (
                          <Tag key={tagIndex}>{typeof tag === 'object' ? tag.name : tag}</Tag>
                        ))}
                    </div>
                    <WhoAndWhen>
                      asked {formatDate(question.createdAt)} By{' '}
                      {question.username && question.username != null && (
                        <UserLink>
                          <span>{question.username}</span>
                        </UserLink>
                      )}
                      {question.username === null && (
                        <UserLink>
                          <span>Anonyme</span>
                        </UserLink>
                      )}
                    </WhoAndWhen>
                  </QuestionTitleArea>
                </StyledQuestionRow>
              ))}

            <Pagination
              postsPerPage={postPerPage}
              totalPosts={questionDatas.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
