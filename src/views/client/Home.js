import { createGlobalStyle } from "styled-components";
import Navbar from "./homeComponents/Navbar"
import {Reset} from 'styled-reset'
import QuestionsPage from "./homeComponents/QuestionsPage";
import Acceuil from "./Acceuil";
import NewNavbar from "./homeComponents/NewNavbar";






function Home (){
    return(
        <div>
            <Reset />
            <NewNavbar />
            <Acceuil />
        </div>
    )
}

export default Home;