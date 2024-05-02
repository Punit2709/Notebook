import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let host = `http://localhost:5000`;
  const notesIntial = [];

  const [notes, setNotes] = useState(notesIntial);

  const getAllNote = async () => {
    let url = `${host}/api/notes/getnotes`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo`,

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo"
      },
    });

    const json = await response.json();
    setNotes(json);
  }

  // Add Note
  const addNote = async ({ title, description, tag }) => {
    let url = `${host}/api/notes/addnotes`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo`,

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo"
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const json = await response.json();
    setNotes(notes.concat(json))
  }

  // Delete Note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo`,

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo"
      },
    });

    const json = response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    // console.log(id);
  }

  // Edit Note
  const editNote = async (id, title, tag, description) => {

    let url = `${host}/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo`,

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VydG9rZW4iOnsiaWQiOiI2NjJkZDAxYmI5OGZlZWU4YzdlOTI3NzMifSwiaWF0IjoxNzE0NTQwNTkzfQ.syPGm3kKYTe-D6wmixPGs3kJG0GCwZUDKxmmHD4Osjo"
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const json = await response.json();

    const newNotes = JSON.parse(JSON.stringify(notes))

    newNotes.forEach((note) => {
      if (note._id === id) {
        note.title = title;
        note.tag = tag;
        note.description = description;
      }
    })
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, getAllNote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;