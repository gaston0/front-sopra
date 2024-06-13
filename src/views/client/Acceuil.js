import React from "react"
import { NavLink } from "react-router-dom";
import "src/views/client/Acceuil.css";
import doubt from "src/assets/images/backgrounds/doubt.png";
import { Link } from "react-router-dom/dist";



var margin = {
    marginTop: "80px",
}
var color1 = {
    backgroundColor: 'white',
    height: '100vh',}

function Acceuil() {
    
    return (
        <>
            <div >
            <header Style="height:60px; margin-top:20vh; z-index:1; background-color:white">

                <div className="container mt-1 text-center">
                    <div className="row">


                        <div className="col-lg-6 col-md-12 col-xs-12 mx-4">
                            <div className="contents">
                                <h2 className="head-title">DoubtOut <br /><small>-A Doubt Solving Platform</small></h2>
                                <p>Find the best answer to your technical question, help others answer theirs. DoubtOut is a community-based space to find and contribute answers to technical challenges.</p>
                            </div>
                            <div className="d-flex justify-content-start">
                                <Link to={'/client/questionpage'}><button className="btn btn-danger custom-btn ">Get Started</button></Link>

                            </div>
                        </div>

                        <div className="col-lg-5 col-md-12 col-xs-12 mx-3 ">
                            <div className="intro-img">
                                <img src={doubt} alt="not loaded" />
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            <footer className="text-center text-lg-start" Style="background-color: #5c5c5c; position:absolute; bottom:0vh;width:100%;margin-top:-14px">

                <div className="text-center text-white p-3" Style="background-color: #282828;">
                    © 2024 Made With ❤ SopraQR

                </div>

            </footer>
            </div>
        </>


    )
}

export default Acceuil