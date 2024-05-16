import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './homeComponents/Navbar';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import './QuestionPageById.css';

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

function QuestionsPageById() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [reply, setReply] = useState('');
  const [replyToId, setReplyToId] = useState(null);
  const replyRef = useRef(null);
  const { questionId } = useParams();

  const handleReplyClick = (answerId) => {
    setReplyToId(answerId);
    replyRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleReplySubmit = async (parentAnswerId, event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8080/api/questions/${questionId}/answers/${parentAnswerId}/responses`,
        { content: reply },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReply('');
    } catch (error) {
      console.error('Error posting reply:', error.message);
    }
  };

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
  if (question) {
    console.log(question);
    console.log(question.file);
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
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
                        <span className="date">
                          <i className="fas fa-calendar" />{' '}
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <h2>{question.title}</h2>
                      <Markdown remarkPlugins={[remarkGfm]}>{question.content}</Markdown>
                      <p>Créé le : {new Date(question.createdAt).toLocaleString()}</p>
                      <p>
                        Mis à jour le :{' '}
                        {question.updatedAt
                          ? new Date(question.updatedAt).toLocaleString()
                          : 'Pas encore mis à jour'}
                      </p>
                      <p>Tags :</p>
                      <ul>
                        {question.tags.map((tag) => (
                          <li key={tag.id}>{tag.name}</li>
                        ))}
                      </ul>
                      <p>Réponses :</p>
                      <ul>
                        {question.answers.map((answer) => (
                          <div key={answer.id}>
                            <p>{answer.content}</p>
                            <a href="#" onClick={() => handleReplyClick(answer.id)}>
                              Reply
                            </a>
                          </div>
                        ))}
                      </ul>

                      {question && question.file && (
                        <div>
                          <p>File:</p>
                          {question.contentType === 'application/pdf' && (
                            <embed
                              src={`data:application/pdf;base64,${question.file}`}
                              type="application/pdf"
                              width="50%"
                              height="300px"
                            />
                          )}
                          {question.contentType === 'image/jpeg' && (
                            <embed
                              src={`data:image/jpeg;base64,${question.file}`}
                              type="image/jpeg"
                              width="100%"
                              height="600px"
                            />
                          )}
                          {question.contentType === 'text/csv' && (
                            <embed
                              src={`data:text/csv;base64,${question.file}`}
                              type="text/csv"
                              width="100%"
                              height="600px"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <textarea
                    name="comment"
                    id="comment"
                    cols={30}
                    rows={10}
                    placeholder="Your Message"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <input type="submit" value="Submit" />
                </form>
                <form onSubmit={(event) => handleReplySubmit(replyToId, event)}>
                  <textarea
                    ref={replyRef}
                    name="reply"
                    id="reply"
                    cols={30}
                    rows={10}
                    placeholder="Your Reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <input type="submit" value="Reply" />
                </form>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default QuestionsPageById;
