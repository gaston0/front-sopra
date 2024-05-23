import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import './QuestionPageById.css';
import NewNavbar from './homeComponents/NewNavbar';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=PlusJakartaSans:wght@300,400;700&display=swap');
  body {
      Background: #FFF;
      color: #000000;
      font-family: Plus Jakarta Sans, sans-serif;
  }
  b,strong {
     
  }
  a {
      color: #fff;
  }
  p {
      margin: 10px 0;
      line-height: 1.5rem;
  }
  h1,h2 {
      margin-top: 20px;
      margin-bottom: 10px;
  }
  h1 {
      font-size: 1.8rem;
  }
  h2 {
      font-size: 1.6rem;
  }
  blockquote {
      background-color: rgba(0,0,0,0.1);
      padding: 15px;
      border-radius: 4px;
  }
`;

const Container = styled.div`
  padding: 30px 20px;
`;

const Cader = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;
const Comment = styled.div`
  background: #f2f2f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #000000;
  margin: 30px 0;
`;

const EditDeleteIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

function QuestionsPageById() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const { questionId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  library.add(faUser, faCalendar);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/questions/${questionId}/answers`,
        { content: answer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAnswer('');
      window.location.reload();
    } catch (error) {
      console.error('Error posting answer:', error.message);
    }
  };

  useEffect(() => {
    const fetchQuestionById = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error.message);
      }
    };

    fetchQuestionById();
  }, [questionId]);

  const [replyToId, setReplyToId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const replyFormRef = useRef(null);

  const handleReplyClick2 = (answerId) => {
    setReplyToId(answerId);
  };

  const handleReplySubmit2 = async (parentAnswerId, event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Gérer le cas où le token n'est pas disponible
        console.error("Token d'authentification non disponible");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/api/questions/${questionId}/answers/${parentAnswerId}/responses`,
        { content: replyContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Réponse postée avec succès:', response.data);
      setReplyContent('');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la publication de la réponse:', error.message);
    }
  };

  const handleClickOutside = (event) => {
    if (replyFormRef.current && !replyFormRef.current.contains(event.target)) {
      setReplyToId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <NewNavbar />
      <Container>
        <GlobalStyle />
        {question && (
          <div className="mt-150 mb-150">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="single-article-section">
                    <div className="single-article-text">
                      <div className="single-artcile-bg" />
                      <p className="blog-meta">
                        <span className="author">
                          <i className="fas fa-user" />{' '}
                        </span>
                        {question && question.file && (
                          <div
                            className="file"
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: '5px',
                              marginTop: '50px',
                            }}
                          >
                            {question.contentType === 'application/pdf' && (
                              <embed
                                src={`data:application/pdf;base64,${question.file}`}
                                type="application/pdf"
                                width="800px"
                                height="400px"
                              />
                            )}
                            {question.contentType === 'image/jpeg' && (
                              <embed
                                src={`data:image/jpeg;base64,${question.file}`}
                                type="image/jpeg"
                                width="800px"
                                height="400px"
                              />
                            )}
                            {question.contentType === 'text/csv' && (
                              <embed
                                src={`data:text/csv;base64,${question.file}`}
                                type="text/csv"
                                width="800px"
                                height="400px"
                              />
                            )}
                          </div>
                        )}
                        <p className="blog-meta">
                          <span className="author">
                            <FontAwesomeIcon icon="user" style={{ marginRight: '5px' }} />{' '}
                            {question.userAnonymous ? 'Anonyme' : 'Admin'}
                          </span>
                          <span className="date">
                            <FontAwesomeIcon icon="calendar" style={{ marginRight: '5px' }} />
                            {new Date(question.createdAt).toLocaleDateString()}
                          </span>
                          <span>
                            Mis à jour le :{' '}
                            {question.updatedAt
                              ? new Date(question.updatedAt).toLocaleString()
                              : 'Pas encore mis à jour'}
                          </span>
                        </p>
                      </p>
                      <h2 className="title">{question.title}</h2>
                      <p className="content">{question.content}</p>
                      <div className="tags">
                        <p className="tag" style={{ color: 'black' }}>
                          Tags :
                        </p>
                        <div className="tag-container" style={{ marginBottom: '5px' }}>
                          {question.tags.map((tag) => (
                            <div key={tag.id} className="tag-item">
                              {tag.name}
                              <a className="tagli"></a>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="comments-list-wrap">
                        <h3 className="comment-count-title">
                          {question.answers.length} response :
                        </h3>

                        <div className="comment-list">
                          {question.answers.map((answer) => (
                            <React.Fragment key={answer.id}>
                              <div
                                className="single-comment-body"
                                style={{ marginTop: '10px', marginBottom: '10px' }}
                              >
                                <div className="comment-user-avatar"></div>
                                <div className="comment-text-body">
                                  <h4>
                                    <FontAwesomeIcon
                                      icon="user"
                                      className="user-icon"
                                      style={{ fontFamily: 'monospace', marginLeft: '50px' }}
                                    />
                                    <span style={{ marginLeft: '5px' }}>{answer.user}</span>
                                    <span className="comment-date" style={{ marginLeft: '5px' }}>
                                      A répondu le {new Date(answer.createdAt).toLocaleDateString()}
                                    </span>{' '}
                                    <button
                                      style={{ marginTop: '5px', marginLeft: '10px' }}
                                      type="button"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleReplyClick2(answer.id);
                                      }}
                                    >
                                      reply
                                    </button>
                                  </h4>
                                  <Cader>
                                    <p style={{ color: 'black', paddingTop: '7px' }}>
                                      {answer.content}
                                    </p>
                                  </Cader>
                                  {replyToId === answer.id && (
                                    <form
                                      ref={replyFormRef}
                                      onSubmit={(e) => handleReplySubmit2(answer.id, e)}
                                      className="reply-form"
                                    >
                                      <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Your reply"
                                        cols="30"
                                        rows="3"
                                      />
                                      <button
                                        type="submit"
                                        className="btn btn-danger btn-sm"
                                        style={{ marginTop: '5px', marginBottom: '10px' }}
                                      >
                                        Submit
                                      </button>
                                    </form>
                                  )}
                                  <div>
                                    {answer.responses.length > 0 && (
                                      <div style={{ marginLeft: '20px' }}>
                                        <h5>Replies:</h5>
                                        {answer.responses.map((response) => (
                                          <Comment key={response.id}>
                                            <p>{response.content}</p>
                                          </Comment>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Separator />
                            </React.Fragment>
                          ))}
                          <span style={{ fontSize: '20px', color: 'black', marginBottom: '10px' }}>
                            Make your answer with love :{' '}
                          </span>
                          <form onSubmit={handleSubmit} style={{ marginTop: '5px' }}>
                            <textarea
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              placeholder="Your answer"
                              cols="30"
                              rows="3"
                              style={{ width: '100%', marginBottom: '10px' }}
                            />
                            <button
                              className="btn"
                              style={{
                                marginRight: '20px',
                                backgroundColor: '#cf022b',
                                color: '#fff',
                              }}
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default QuestionsPageById;
