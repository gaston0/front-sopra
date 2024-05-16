import React from 'react';
import { NavLink } from 'react-router-dom';
 
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
 
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
 
    return (
        <nav style={{width: "auto"}}>
          <ul className='pagination'>
            {pageNumbers.map(number => (
              <li key={number} className='page-item'>
                <button type="button" onClick={() => paginate(number)} className='page-link'>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      );
    };
  export default Pagination;