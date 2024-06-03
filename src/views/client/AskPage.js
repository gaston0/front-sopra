import React, { useRef, useState, useEffect, setState } from 'react';
import NewNavbar from './homeComponents/NewNavbar';
import './askpage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

const AskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [tagId, setTagId] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const editor = useRef(null);
  const votreToken = localStorage.getItem('token');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const config = {
    // Vos configurations JoditEditor
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/tags/getAll', {
          headers: {
            Authorization: `Bearer ${votreToken}`,
          },
        });
        setTags(response.data); // Assuming the response data is an array of tags
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (editor.current) {
      // Vérifier si l'éditeur est prêt
      if (editor.current.editor) {
        // L'éditeur est prêt, nous pouvons maintenant ajouter un écouteur pour l'événement 'ready'
        editor.current.editor.events.on('ready', () => {
          console.log('Editor is ready!');
        });
      } else {
        // L'éditeur n'est pas encore prêt, attendons un instant et réessayons
        setTimeout(() => {
          console.log('Retrying editor initialization...');
          // Rappel de useEffect pour réessayer l'initialisation
        }, 1000); // Attendre 1 seconde avant de réessayer
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the authentication token from localStorage

    // Check if the token is present
    if (!votreToken) {
      alert('Please log in to ask a question.');
      navigate('/auth/login'); // Redirect to the login page
      return;
    }

    // Create a headers object with the authentication token
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${votreToken}`, // Include the token in the Authorization header
    };

    const formData = new FormData();
    formData.append('questionRequest.title', title);
    formData.append('questionRequest.content', content);
    formData.append('file', file);
    formData.append('tagIds', selectedTags.map(tag => tag.value));
        formData.append('userAnonymous', isAnonymous);

    // Send the data to the server with Axios
    try {
      const response = await axios.post('http://localhost:8082/api/questions/create', formData, {
        headers: headers, // Pass the headers object to Axios
      });

      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Question created successfully!',
        });

        navigate('/client/questionpage'); // Redirect to home page or wherever you want
      }
    } catch (error) {
      console.error('Error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the question. Please try again later.',
      });
    }
  };

  return (
    <>
      <NewNavbar />
      <div style={{ marginTop: 100 }}>
        <div className="container mb-5" style={{ width: '70%', display: 'block', margin: 'auto' }}>
          <div className="card mt-5" style={{ backgroundColor: 'hsl(206,100%,97%)' }}>
            <div className="card-header">
              <h3>
                <b>Ask a Public Question</b>
              </h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">Writing a Good Question</h5>
              <p className="card-text">
                You’re ready to ask a programming-related question and this form will help guide you
                through the process.
              </p>
              <h5>Steps</h5>
              <ul>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Describe what you tried and what you expected to happen.</li>
                <li>Add “tags” which help surface your question to members of the community.</li>
              </ul>
            </div>
          </div>
          <form id="question-form" onSubmit={handleSubmit}>
            <div className="card mb-3 mt-5">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Subject</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Add file</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputTags">Question Tags</label>

                  <Select
                    value={selectedTags}
                    onChange={setSelectedTags}
                    options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                    isMulti={true}
                    placeholder="Select tags"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Enter Question Tags
                  </small>
                </div>
              </div>
            </div>
            <div className="form-group form-check" style={{marginTop:"30px"}}>
  <input
    type="checkbox"
    className="form-check-input"
    id="anonymousCheckbox"
    checked={isAnonymous}
    style={{backgroundColor:"red",borderColor:"white"}}
    onChange={(e) => setIsAnonymous(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="anonymousCheckbox">
  <FontAwesomeIcon icon={faUserSecret} style={{ marginRight: "5px" }} />
    Rester anonyme
  </label>
</div>

            <button type="submit" className="btn btn-danger custom-btn mt-5 mb-5">
              Ask Question
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AskPage;
