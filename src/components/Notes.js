// Note.js has one Component in it which is EDIT 
// Note.js can also be renamed as EditNote.js
// Edit is very much complicated you have to once more use more than 50-60% of the AddNote.js code
import React, { useContext } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const {notes,  getNotes, editNote } = context;
  useEffect(() => {
      getNotes()
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null) // Use the 'useRef' function to create a ref object. You can do this in your functional component
  const refClose = useRef(null)
  const [note, setNotes] = useState({ id: "", etitle: "", edescription: " ", etag: "default" })


  const updateNote = (currentNote) => {
    ref.current.click(); // Accessing and Manipulating the Ref
    setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  // HERE WE ARE COPY AND PASTE FROM AddNote FOLDER
  // COPYIED FROM HERE 
  const handleClick = (e) => {
    console.log("Updating the Note...", note);
    editNote(note.id, note.etitle, note.edescription, note.etag) // editNote from NoteState is passed before closing the modal
    refClose.current.click(); //This line of code written for closing the Modal
    props.showAlert("Updated Successfuly", "success")
  }

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })  //HERE SPREAD AND REST OPERATOR IS USED
  }
  //COPYIED TILL HERE


  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} // Attaching the Ref to a DOM Element
        type="button" className="btn btn-primary d-none" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* HERE WE ARE COPY AND PASTE FROM AddNote FOLDER */}
              {/* COPYIED FROM HERE */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} //This value are added for Edit and they were no there previously in addnote
                    aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} //This value are added for Edit and they were no there previously in addnote
                    onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} //This value are added for Edit and they were no there previously in addnote 
                    onChange={onChange} />
                </div>

              </form>
              {/* COPYIED TILL HERE */}

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="row my-3">
        
        <h2>You Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          //By updateNote passing a prop 
          //Above things that is in return is passed as a prop and it is being used in the Noteitem Component File 
          // These Two Folders are working in the Group which is the like
          // SQUAD Game :- Cho Sang woo and Ali in Marble game
          // Similar to SQUAD Game := Notes.js and Noteitem in inotebook game
        })}
      </div>
    </>
  )
}

export default Notes


//Hooks:- Short Note on Hook
// 1) useEffect :- It Runs Every Time a page is refreshed or make changes it has two arguments one is (1)Useffect Function (2)Dependency Array List . Dependency Array List is usually kept blank like for e.g. [] . We are using useEffect for the purpose of get or fetch all Notes because once a note is deleted or edited it should get Fetched
// 2) What is useRef ? Ans:- DOM Manipulation directly without using document.getElementById or props or state
//    How to use it :- SYNTAX:- const refElement = useRef("");

// YOU CANNOT TYPE WITHOUT THE ONCHANGE