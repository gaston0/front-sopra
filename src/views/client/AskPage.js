import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";
import NewNavbar from "./homeComponents/NewNavbar";

const config = {
    buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],


};

function AskPage (){
    
    return(
        <>
        <NewNavbar />
        <div mb-4>
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
            <form >
              <div className="card mb-3 mt-5">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" name="title" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title" />
                    <small id="emailHelp" className="form-text text-muted">Enter Your title in few Words</small>
                  </div>
                </div>
              </div>
  
              
  
              <div className="card mt-3">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Question Tags</label>
                    <input type="text" name="tags" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Tags" />
                    <small id="emailHelp" className="form-text text-muted">Enter Question Tags</small>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-5 mb-5">Ask Question</button>
            </form>
          </div>
        </div>
      </>
    )
}

export default AskPage;