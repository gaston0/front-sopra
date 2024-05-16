import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Pagination from './pagination';

const QuestionStat = styled.div`
    text-align:center;
    display:inline-block;
    font-size: 1.2rem;
    color:#aaa;
    margin-top:6px;
    span {
        font-size:.7rem;
        display:block;
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
    font-size: .9rem;
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
    font-size: .8rem;
    float: right;
    padding: 10px 0;
`;

const UserLink = styled.a`
    color: #bc1434;
`;





function QuestionRow({  }) {
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const [question, setQuestionData] = useState([]);

    const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = question.slice(indexOfFirstPost, indexOfLastPost);
 
const paginate = pageNum => setcurrentPage(pageNum);
    return (
        <>
            <StyledQuestionRow>
                <QuestionStat>0<span>votes</span></QuestionStat>
                <QuestionStat>0<span>answers</span></QuestionStat>
                <QuestionStat>0<span>views</span></QuestionStat>
                <QuestionTitleArea>
                    <QuestionLink to={'/client/question'}></QuestionLink>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                    <WhoAndWhen>
                        asked 2mins ago<UserLink>Ghassen</UserLink>
                    </WhoAndWhen>
                </QuestionTitleArea>
            </StyledQuestionRow>
        </>
    );
}

export default QuestionRow;
