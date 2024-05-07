import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./homeComponents/Navbar";
import StyledHeader from "./homeComponents/Header1";
import Markdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import axios from "axios";

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
    const { questionId } = useParams();
    
    useEffect(() => {
        const fetchQuestionById = async () => {
            try {
                const votreToken = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8082/api/questions/${questionId}`, {
                    headers: {
                        'Authorization': `Bearer ${votreToken}`
                    }
                });
                setQuestion(response.data);
            } catch (error) {
                console.error('Error fetching question data:', error.message);
            }
        };
        
        fetchQuestionById();
    }, [questionId]);

    return (
        <>
            <GlobalStyle />
            <Navbar />
            <Container>
                {question && (
                    <>
                        <StyledHeader>{question.title}</StyledHeader>
                        <Markdown remarkPlugins={[remarkGfm]}>{question.content}</Markdown>
                    </>
                )}
            </Container>
        </>
    );
}

export default QuestionsPageById;
