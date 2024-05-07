import React,{useState} from 'react';
import './sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { NavLink } from 'react-router-dom'

const SidebarOption = ({ title, children }) => {
    return (
        <div className="sidebar-option">
            <p>{title}</p>
            <div className="link" style={{ marginRight: '20px' }}>{children}</div>
        </div>
    );
};


const Sidebar = () => {
    

    return (
      <div className="">
      <div style={{height:'100%'}}>
       <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px', height: '100%'}}>
  <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    <svg className="bi me-2" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
    <span className="fs-4">Sidebar</span>
  </a>
  <hr />
  <ul className="nav nav-pills flex-column mb-auto pt-3">
    <li >
    <a href="/client/questionpage" className="nav-link link-dark">
        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#speedometer2" /></svg>
        Question
      </a>
     
    </li>


    <li>
      <a href="/client/tags" className="nav-link link-dark">
        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#grid" /></svg>
        Tags
      </a>
    </li>
    <li>
      <a href="#" className="nav-link link-dark">
        <svg className="bi me-2" width={16} height={16}><use xlinkHref="#people-circle" /></svg>
        Customers
      </a>
    </li>
  </ul>
  <hr />
</div>
</div>
</div>

    );
};

export default Sidebar