import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import NewNavbar from './NewNavbar';
import '../homeComponents/Tags.css';
import Swal from 'sweetalert2';
import '../homeComponents/swal.css';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importer les icônes de suppression et de modification

export default function Tags() {
  const [tags, setTags] = useState([]);
  const userRole = localStorage.getItem('role');

  const votreToken = localStorage.getItem('token');
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/tags/getAll', {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error.message);
      }
    };

    fetchTags();
  }, []);

  const handleAddTag = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Tag',
      html:
        '<input id="name" class="swal2-input" style="margin-bottom : 10px"  placeholder="Enter tag name" />' +
        '<textarea id="description" class="swal2-input" style="padding : 10px" placeholder="Enter tag description"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('name').value,
          description: document.getElementById('description').value,
        };
      },
    });

    if (formValues && formValues.name) {
      // Call API to add the new tag
      try {
        await axios.post('http://localhost:8082/api/tags/create', formValues, {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        // Refresh the tags list
        const response = await axios.get('http://localhost:8082/api/tags/getAll', {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        setTags(response.data);
        Swal.fire('Tag added successfully!', '', 'success');
      } catch (error) {
        console.error('Error adding tag:', error.message);
        Swal.fire('Error adding tag', '', 'error');
      }
    }
  };

  const handleDeleteTag = async (tagId) => {
    // Afficher une boîte de dialogue de confirmation avant la suppression
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tag!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8082/api/tags/${tagId}`, {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        // Actualiser la liste des tags après la suppression
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
        setTags(updatedTags);
        Swal.fire('Tag deleted successfully!', '', 'success');
      } catch (error) {
        console.error('Error deleting tag:', error.message);
        Swal.fire('Error deleting tag', '', 'error');
      }
    }
  };

  const handleEditTag = async (tagId) => {
    const tagToUpdate = tags.find((tag) => tag.id === tagId);
    const { value: updatedTag } = await Swal.fire({
      title: 'Edit Tag',
      html:
        `<input id="swal-input-name" class="swal2-input" placeholder="Tag Name" value="${tagToUpdate.name}">` +
        `<textarea id="swal-input-description" class="swal2-textarea" placeholder="Tag Description">${tagToUpdate.description}</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById('swal-input-name').value;
        const description = document.getElementById('swal-input-description').value;
        return { name, description }; // Ensure both name and description are returned
      },
    });
  
    if (updatedTag) {
      try {
        await axios.put(`http://localhost:8082/api/tags/${tagId}`, updatedTag, {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        Swal.fire('Tag updated successfully!', '', 'success');
  
        // Update only the tag's description
        setTags((prevTags) =>
          prevTags.map((tag) =>
            tag.id === tagId ? { ...tag, description: updatedTag.description } : tag
          )
        );
      } catch (error) {
        console.error('Error updating tag:', error.message);
        Swal.fire('Error updating tag', '', 'error');
      }
    }
  };
  

  return (
    <>
      <NewNavbar />

      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          {' '}
          {/* This div will take up the remaining space */}
          <div style={{ marginTop: '13vh', zIndex: 1, backgroundColor: 'white' }}>
            <div className="">
              <div className="stack-index">
                <div className="stack-index-content">
                  <div className="main">
                    <h1 style={{ marginTop: '-20px' }}>Tags</h1>
                    <div className="mt-5">
                      {userRole !== 'ROLE_USER' || userRole !== 'ROLE_ADMIN' && (
                        <button
                          className="btn"
                          style={{ float: 'right', backgroundColor: '#cf022b', color: '#fff' }}
                          onClick={handleAddTag}
                        >
                          Ajouter Tag
                        </button>
                      )}
                      A tag is a keyword or label that categorizes your question with other, similar
                      questions.
                      <br />
                      Using the right tags makes it easier for others to find and answer your
                      question.
                    </div>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                      {tags.map((tag) => (
                        <div key={tag.id} className="col">
                          <div className="card h-100">
                            <div className="card-body">
                              <NavLink
                                className="card-title p-1"
                                to={{ pathname: `/client/questionOntags/${tag.name}` }}
                                style={{
                                  color: 'hsl(205,47%,42%)',
                                  backgroundColor: 'hsl(205,46%,92%)',
                                  borderRadius: '5px',
                                  display: 'inline',
                                }}
                              >
                                {tag.name}
                              </NavLink>
                              <p className="card-text m-2">
                                {tag.description ? tag.description.slice(0, 100) : ''}...
                              </p>
                              {userRole !== 'ROLE_USER' || userRole !== 'ROLE_ADMIN' && (
                                <div style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                  <FaTrash
                                    style={{ marginRight: '5px', cursor: 'pointer' }}
                                    onClick={() => handleDeleteTag(tag.id)}
                                  />
                                  <FaEdit
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEditTag(tag.id)}
                                  />
                                </div>
                              )}
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
