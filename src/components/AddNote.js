import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const[note,setNotes] = useState({title : "",description : " ",tag:""})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title ,note.description, note.tag);
        //Below Line of Code is written for the Purpose of the Empyting the 
        setNotes(({title : "",description : " ",tag:""}))
        props.showAlert("Added Successfuly","Success")
    }

    const onChange = (e)=>{
        setNotes({...note,[e.target.name]:e.target.value}) //HERE SPREAD AND REST OPERATOR IS USED
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note </button>
            </form>
        </div>
    )
}

export default AddNote
  