import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/fontawesome-free-brands';
import React from "react";
import { Link } from "react-router-dom";
import RedButton from "./RedButton";
import { useState,useEffect } from "react";
import RedButtonLink from "./RedButtonLink";
import Profile from "src/layouts/full/header/Profile";

const StyledHeader = styled.header`
  background-color : #f2f2f2;
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
  display:grid;
  grid-template-columns: 220px 1fr 220px;
  grid-column-gap: 20px;
`;

const LogoLink = styled(Link)`
    color : #000000;
    text-decoration : none;
    display: inline-block;
    height: 50px;
    line-height: 30px;
    padding: 0px 15px;
    svg{
        margin-top: 9px;
        display: inline-block;
        float:left;
     }  
    span{
     display: inline-block;
     padding-left:5px;
     padding-top:15px;
     font-size:1.2rem;
     font-weight : 300;
    }
    b{
     font-weight: normal;
     display: inline-block;
     margin-left:2px;
    }
`
const SearchInput = styled.input`
box-sizing: border-box;
display: block;
width:100%;
border: 1px solid #777;
border-radius: 3px;
background:rgba(0,0,0,0.1);
padding: 8px 10px;
margin-top: 14px;
`;
const ProfileLink = styled(Profile)`

line-height: 50px;
`;


function Navbar (){

    const [username, setUsername] = useState('');

    useEffect(() => {
        // Récupérer le nom d'utilisateur depuis localStorage
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUsername(userData.username); // Enregistrer le nom d'utilisateur dans l'état
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);
    
    return(
        <StyledHeader>
            <LogoLink to={'/client/home'} className="Logo">
            <FontAwesomeIcon icon={faStackOverflow} size="2x" />
               <span>QR-<b>Sopra</b></span>
               </LogoLink>
            <form action="" className="search">
                <SearchInput type="text" placeholder="Recherche..."/>
            </form>
            <ProfileLink />
            
        </StyledHeader>
    )
}

export default Navbar;