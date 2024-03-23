import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInital = [];
  const [notes, setNotes] = useState(notesInital);

  //CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE 
  // Add a Note(CREATE)
  const addNote = async (title, description, tag) => {
    //TO DO: API CALL 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))  //Focus on spelling it is concat(con cat) it is not a Contact //Concat returns an array
  }

  // READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ READ
  // Get all Notes 
  const getNotes = async () => {
    // API CALL 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  // UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE
  //Edit a Note()
  const editNote = async (id, title, description, tag) => {
    //API Call
    //Later we will make new fuction or File to keep it Organized 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token') //NOTE:- IT IS GETITEM AND NOT SETITEM
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    //This is to show on Frontend when error was coming this line has been written
    let newNotes = JSON.parse(JSON.stringify(notes))

    //LOGIC TO EDIT IN CLIENT
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes)
  }

  // DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE
  // Delete a Note()
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    //LOGIC TO DELETE IN CLIENT
    const newNotes = notes.filter((note) => { return note._id !== id })   //.filter() is an array method used for deletion
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;