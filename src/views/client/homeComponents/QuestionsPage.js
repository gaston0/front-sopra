import React from "react";
import styled from "styled-components";
import Sidebar from "./sidebar";
import NewNavbar from "./NewNavbar";
import Header2 from "./Header2";
import { NavLink } from "react-router-dom";
import QuestionRow from "./QuestionsRow";



const HeaderRow = styled.div`
display:grid;
grid-template-columns: 1fr min-content;
padding: 30px 20px;
`





function QuestionsPage(){
    return(
        <>
        <NewNavbar />
        
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}> {/* This div will take up the remaining space */}
            <Header2 />
            <QuestionRow />
            <QuestionRow />
            <QuestionRow />
            <QuestionRow />
          </div>
          
        </div>
      </>
      

    )
};

export default QuestionsPage;