import React from 'react';
import { NavLink } from 'react-router-dom';

const Pagination = ({ currentPage, postPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li className="page-item" key={number}>
                        <NavLink className="page-link" onClick={() => paginate(number)} to="#" >
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
