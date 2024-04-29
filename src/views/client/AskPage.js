import React, { useRef, useState,useEffect,setState} from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import NewNavbar from "./homeComponents/NewNavbar";
import "./askpage.css";
import axios from "axios";
import { useNavigate } from "react-router";



const AskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const editor = useRef(null);

  const config = {
    // Vos configurations JoditEditor
  };

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Retrieve the authentication token from localStorage
    const votreToken = localStorage.getItem('token');
  
    // Check if the token is present
    if (!votreToken) {
      alert('Please log in to ask a question.');
      navigate('/auth/login'); // Redirect to the login page
      return;
    }

    // Envoyer les données au serveur avec Axios
    axios.post('http://localhost:8080/api/questions/create', {
      title: title,
      content: content,
      tags: tags
    }, {
      headers: {
        'Authorization': `Bearer ${votreToken}`, // Ajouter le token d'authentification dans les en-têtes
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response)
        alert('Question soumise avec succès !');
        // Réinitialiser le formulaire si nécessaire
        setTitle("");
        setContent("");
        setTags("");
        document.getElementById('question-form').reset();
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la soumission de la question :', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    });
  };
    
    return(
      <>
      <NewNavbar />
      <div style={{ marginTop: 100 }}>
        <div className="container mb-5" style={{ width: '70%', display: 'block', margin: 'auto' }}>
          <div className="card mt-5" style={{ backgroundColor: 'hsl(206,100%,97%)' }}>
            <div className="card-header">
              <h3><b>Ask a Public Question</b></h3>
            </div>
            <div className="card-body">
              <h5 className="card-title">Writing a Good Question</h5>
              <p className="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
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
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title" />
                  <small id="emailHelp" className="form-text text-muted">Enter Your title in few Words</small>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={newContent => setContent(newContent)}
                />
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="exampleInputTags">Question Tags</label>
                  <input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} id="exampleInputTags" aria-describedby="emailHelp" placeholder="Enter Tags" />
                  <small id="emailHelp" className="form-text text-muted">Enter Question Tags</small>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary custom-btn mt-5 mb-5">Ask Question</button>
          </form>
        </div>
      </div>
    </>
    )
}

export default AskPage;