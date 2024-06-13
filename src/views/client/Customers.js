import React from 'react';
import NewNavbar from './homeComponents/NewNavbar';
import Sidebar from './homeComponents/sidebar';
import '../client/Customers.css';

import { NavLink } from 'react-router-dom';

const searchSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.414-1.414l-3.85-3.85a1.007 1.007 0 0 0-.114-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
`;

const searchSVGDataURL = `data:image/svg+xml,${encodeURIComponent(searchSVG)}`;

const Customers = () => {
  return (
    <>
      <NewNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div style={{ marginTop: '13vh', zIndex: 1, backgroundColor: 'white' }}>
            <div className="">
              <div className="stack-index">
                <div className="stack-index-content">
                  <div className="main">
                    <h1 style={{ marginTop: '-20px' }}>Users</h1>
                    <div className="mt-5"></div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
