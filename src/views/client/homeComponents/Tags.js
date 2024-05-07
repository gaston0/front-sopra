import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "./sidebar";
import NewNavbar from "./NewNavbar";
import Header2 from "./Header2";
import styled from "styled-components";

export default function Tags() {
    const [tags, setTags] = useState([]);
const votreToken = localStorage.getItem("token");
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tags/getAll', {
                    headers: {
                        'Authorization': `Bearer ${votreToken}`
                    }
                });
                setTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error.message);
            }
        };

        fetchTags();
    }, []);

    return (

        <>
              <NewNavbar />
        
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1 }}> {/* This div will take up the remaining space */}

        

        <div style={{  marginTop: '13vh', zIndex: 1, backgroundColor: 'white' }}>
            <div className="">
                <div className="stack-index">
                    <div className="stack-index-content">
                        <div className="main">
                            <h1 style={{marginTop : "-30px"}}>Tags</h1>
                            <div className='mt-3'  >
                                A tag is a keyword or label that categorizes your question with other, similar questions.
                                <br />
                                Using the right tags makes it easier for others to find and answer your question.
                            </div>
                            <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                                {tags.map(tag => (
                                    <div key={tag.id} className="col">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <NavLink
                                                    className="card-title p-1"
                                                    to={{ pathname: `/questionOntags/${tag.name}` }}
                                                    style={{
                                                        color: 'hsl(205,47%,42%)',
                                                        backgroundColor: 'hsl(205,46%,92%)',
                                                        borderRadius: '5px',
                                                        display: 'inline'
                                                    }}
                                                >
                                                    {tag.name}
                                                </NavLink>
                                                <p className="card-text m-2">{tag.description ? tag.description.slice(0, 100) : ''}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


</div>
          
          </div>
          </>
    );
}
