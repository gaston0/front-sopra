import React, { useState } from 'react';
import './sidebar.css';
import { BsEscape,BsTagFill } from 'react-icons/bs';
import {  BsQuestionCircleFill } from 'react-icons/bs'; // For "tag" and "question" icons



const SidebarOption = ({ title, children }) => {
  return (
    <div className="sidebar-option">
      <p>{title}</p>
      <div className="link" style={{ marginRight: '20px' }}>
        {children}
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="">
      <div className="" style={{ height: '110%' }}>
        <div
          className=" d-flex flex-column flex-shrink-0 p-3 bg-light"
          style={{ width: '280px', height: '100%' }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            <svg className="bi me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
            
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto pt-3">

          <li>
  <a href="/client/questionpage" className="nav-link link-dark">
  <BsQuestionCircleFill className="me-2" style={{ fontSize: '1.5rem' }} />
    Question
  </a>
</li>
<li>
  <a href="/client/tags" className="nav-link link-dark">
  <BsTagFill className="me-2" style={{ fontSize: '1.5rem' }} />

    Tags
  </a>
</li>
<li>
  <a href="#" className="nav-link link-dark">
    <BsEscape className="me-2" style={{ fontSize: '1.5rem' }} /> {/* Add styling */}
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

export default Sidebar;
