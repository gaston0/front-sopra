import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import NewNavbar from './NewNavbar';
import Header2 from './Header2';
import { Link } from 'react-router-dom';
import Pagination from './pagination';
import '../homeComponents/QuestionsPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  const [postPerPage] = useState(4);
  const [currentPage, setcurrentPage] = useState(1);
  const [questionDatas, setQuestionData] = useState([]);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [requestData, setRequestData] = useState({});

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

  

  const handleFavoriteQuestion = async (questionId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/favorites/markQuestionAsFavorite/${questionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        Swal.fire('Question ajoutée comme favoris', '', 'success');
        setIsFavorite(response); // Assurez-vous que cette fonction est correctement implémentée
        console.log(response);
      } else {
        Swal.fire('Erreur dans l\'ajout', '', 'error');
      }
    } catch (error) {
      console.error('Erreur lors de la requête pour marquer la question comme favori :', error);
    }
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

  const handleAllQuestionsClick = async (
    title,
    content,
    userId,
    tags,
    pageIndex,
    pageSize,
    userAnonymous,
  ) => {
    try {
      const response = await fetch('http://localhost:8080/api/questions/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || '',
          content: content || '',
          userId: userId || null,
          tags: tags || [],
          pageIndex: pageIndex || 0,
          pageSize: pageSize || 40,
          userAnonymous: userAnonymous || null,
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

  useEffect(() => {
    fetchAllQuestions();
  }, [votreToken]);

  const handleSearch = async () => {
    if (!searchTitle && !selectedUser && selectedTags.length === 0) {
      fetchAllQuestions();
      return;
    }

    const requestData = {
      content: '',
      pageIndex: 0,
      pageSize: 15,
    };

    if (Array.isArray(selectedTags) && selectedTags.length > 0) {
      if (selectedTags.every((tag) => typeof tag === 'string')) {
        requestData.tags = selectedTags;
      } else {
        console.error('selectedTags ne contient pas les données attendues.');
        return;
      }
    }

    if (searchTitle) {
      requestData.title = searchTitle;
    }

    if (selectedUser === 'Anonyme') {
      requestData.username = null;
    } else if (selectedUser) {
      requestData.userId = parseInt(selectedUser, 10);
    }

    console.log('Request Data:', requestData);

    try {
      const response = await axios.post('http://localhost:8080/api/questions/all', requestData, {
        headers: {
          Authorization: `Bearer ${votreToken}`,
        },
      });

      setQuestionData(response.data);
      console.log('Résultats de la recherche :');
    } catch (error) {
      console.error('Erreur lors de la recherche :', error.message);
    }
  };

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
        
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error.message);
      }
    };

    fetchTags();
    fetchUsers();
  }, [votreToken]);

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
                  <option value="">Tous les utilisateurs</option>
                  <option value="Anonyme">Anonyme</option>
                  {users.map((user) => (
                    <option key={user.matricul} value={user.matricul}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-item">
                <span style={{ color: '#000000' }}>Tags :</span>

                <select id="tagsSelect" value={selectedTags} multiple onChange={handleTagChange}>
                  {tags.map((tag) => (
                    <option key={tag.name} value={tag.name}>
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
                  <QuestionStat style={{paddingTop:"20px"}}>
                    {typeof question.votes === 'number' ? question.votes : 0}
                    <span>votes</span>
                  </QuestionStat>
                  <QuestionStat style={{paddingTop:"20px"}}>
                    {typeof question.answers === 'number' ? question.answers : 0}
                    <span>answers</span>
                  </QuestionStat>
                  <QuestionStat style={{paddingTop:"20px"}}>
                    {typeof question.views === 'number' ? question.views : 0}
                    <span>views</span>
                  </QuestionStat>

                  <QuestionTitleArea style={{paddingTop:"10px"}}>
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
                  <div
                    className={`favorite-icon ${isFavorite ? 'gold' : ''}`}
                    onClick={() => handleFavoriteQuestion(question.id)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </div>
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
