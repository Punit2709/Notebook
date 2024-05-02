import React, { useContext } from "react";
import NoteContext from "../../contexts/Notes/NoteContext";

function NoteCard(props) {
  const { note, update } = props;
  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title bg-primary text-white p-3 rounded-top">
            {note.title}
          </h5>
          <h6 className="card-subtitle mb-2 bg-info text-white p-2 rounded-bottom">
            {note.tag}
          </h6>
          <p className="card-text">
            {note.description}
          </p>
          <div className="text-center mt-3 d-flex justify-content-center">
            <svg
              className="feather feather-edit"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "", cursor: "pointer" }}
              onClick={() => update(note)}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <svg
              height="20"
              viewBox="0 0 48 48"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "2rem", cursor: "pointer" }}
              onClick={() => deleteNote(note._id)}
            >
              <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
