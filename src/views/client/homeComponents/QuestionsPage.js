import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";
import NewNavbar from "./NewNavbar";
import Header2 from "./Header2";
import { Link } from "react-router-dom";
import axios from 'axios';
import Pagination from './pagination';


// Fonction pour formater la date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

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

const StyledQuestionRow = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: repeat(3, 50px) 1fr;
  border: 1px solid #dc3545;
  margin-bottom: 20px;
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

const QuestionsPage = () => {
    const [questionData, setQuestionData] = useState([]);
    const votreToken = localStorage.getItem('token');
  
    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/questions/all?offset=${0}&limit=${5}`, {
              headers: {
                'Authorization': `Bearer ${votreToken}`
              }
            });
            setQuestionData(response.data);
          } catch (error) {
            console.error('Error fetching question data:', error.message);
          }
        };
      
        fetchQuestions();
      }, [votreToken]);
  
    return (
      <>
        <NewNavbar />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Header2 />
            <>
              {questionData.map((question, index) => (
                <StyledQuestionRow key={index}>
                  <QuestionStat>0<span>votes</span></QuestionStat>
                  <QuestionStat>0<span>answers</span></QuestionStat>
                  <QuestionStat>0<span>views</span></QuestionStat>
                  <QuestionTitleArea>
                    <QuestionLink to={`/client/question/${question.id}`}>{question.title}</QuestionLink>
                    {question.tags.map((tag, index) => (
                      <Tag key={index}>{tag.name}</Tag>
                    ))}
                    <WhoAndWhen>
                      asked {formatDate(question.createdAt)} ago <UserLink>{question.user_id}</UserLink>
                    </WhoAndWhen>
                  </QuestionTitleArea>
                </StyledQuestionRow>
              ))}
              <Pagination
                currentPage={1} // Assuming initial page is 1
                postPerPage={5} // Assuming 5 questions per page
                totalPosts={questionData.length} // Assuming this is the total count of questions
                paginate={() => {}} // Placeholder function, actual pagination logic needs to be added
              />
            </>
          </div>
        </div>
      </>
    );
  };

export default QuestionsPage;
