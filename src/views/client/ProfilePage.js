import StyledHeader from "./homeComponents/Header1";
import Navbar from "./homeComponents/Navbar";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=PlusJakartaSans:wght@300,400;700&display=swap');
body{
    Background: #FFF;
    color : #000000;
    font-family : Plus Jakarta Sans,sans-serif;
}
b,strong{
    
}
a{
    color : #fff;
}
p{
    margin : 10px 0;
    line-height: 1.5rem;
}
h1,h2{
    margin-top:20px;
    margin-bottom : 10px;
}
h1{
    font-size: 1.8rem;
}
h2{
    font-size: 1.6rem;
}
blockquote{
    background-color : rgba(0,0,0,0.1);
    padding : 15px;
    border-radius : 4px;
}
`
const Container = styled.div`
padding : 30px 20px
`;


function ProfilePage (){
    return(
        <>
        <GlobalStyle />
        <Navbar />
        <Container>
        <StyledHeader>Profile Page</StyledHeader>
        </Container>
        
        </>
    )

}

export default ProfilePage;