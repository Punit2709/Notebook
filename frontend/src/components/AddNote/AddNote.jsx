import React, { useContext, useState } from "react";
import NoteContext from "../../contexts/Notes/NoteContext";

function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [noteData, setNoteData] = useState({title: "", description:"", tag:""});
  const handleClick = (e) => {
    e.preventDefault();
    addNote(noteData);

    // after adding empty form
    setNoteData({title: "", description:"", tag:""});
    props.showAlert('Added Succefully', 'Success');
  };

  const onChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2> Add Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={noteData.title}
            onChange={onChange}
            min={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={noteData.tag}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={noteData.description}
            onChange={onChange}
            min={5}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleClick(e)}
          disabled={noteData.title.length<5 || noteData.description.length<5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
