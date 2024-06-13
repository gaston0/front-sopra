import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NewNavbar.css';
import sopra from "src/assets/images/logos/sopra (2).svg";
import Profile from "src/layouts/full/header/Profile";

const NewNavbar = () => {
    const navigate = useNavigate();
  
    const logout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('since');
      localStorage.removeItem('Usertype');
      window.location.reload(true);
      navigate("/");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;">
          <div className="container-fluid" style={{ height: "50px" }}>
            <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black', paddingTop: "10px" }}>
              <a href="/client/home" style={{ marginleft: "10px", textDecoration: "none" }}>
              <img src={sopra} alt="logo" style={{ width: "80px", height: "80px", marginRight: "20px"}} />
              </a>
            </div>
    
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" Style={{ bsSscrollHheight: "100px" }}>
              </ul>
    
              <form className="d-flex me-auto" style={{width:"600px", marginRight :"10px"}}>
    <input className="form-control me-2" id="searchQue" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-danger" type="submit">Search</button>
  </form>
    
              <ul className="navbar-nav">
                {localStorage.getItem("Usertype") === 'user' && (
                  <li className="nav-item">
                    <a className="nav-link mr" href="/editor" style={{ color: 'black' }}><button className='btn btn-outline dark'>&lt;/&gt;</button></a>
                  </li>
                )}
                <li className="nav-item">
                  <button className='btn btn-white mr-2'><i className="fa fa-home"></i></button>
                </li>
                {localStorage.getItem("Usertype") === 'user' && (
                  <li className="nav-item">
                    <button className='btn btn-outline-danger' onClick={logout}>Logout</button>
                  </li>
                )}
                {!localStorage.getItem("Usertype") && (
                  <>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Profile />
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    }
    
    export default NewNavbar;