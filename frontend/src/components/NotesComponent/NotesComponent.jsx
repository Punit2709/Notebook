import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../contexts/Notes/NoteContext";
import NoteCard from "../NoteCard.jsx/NoteCard";
import { useNavigate } from "react-router-dom";

function NotesComponent(props) {

  // if not logged in them
  const navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getAllNote, editNote } = context;
  const [modalNote, setModalNote] = useState({
    id: "",
    modalTitle: "",
    modalTag: "",
    modalDescription: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const update = (currentNote) => {
    ref.current.click();
    // Showing previous value in modal
    setModalNote({
      id: currentNote._id,
      modalTitle: currentNote.title,
      modalDescription: currentNote.description,
      modalTag: currentNote.tag,
    });
  };

  const onChange = (e) => {
    setModalNote({ ...modalNote, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // edit Note in DB
    editNote(
      modalNote.id,
      modalNote.modalTitle,
      modalNote.modalTag,
      modalNote.modalDescription
    );

    // Close Modal By Click on Update
    refClose.current.click();
    
    props.showAlert('Updated Succefully', 'Success')
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNote();
    }else{
      navigate('/login');
    }
  }, []);
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="modalTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalTitle"
                    name="modalTitle"
                    onChange={onChange}
                    value={modalNote.modalTitle}
                    min={5} 
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="modalTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalTag"
                    name="modalTag"
                    onChange={onChange}
                    value={modalNote.modalTag}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="modalDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalDescription"
                    name="modalDescription"
                    onChange={onChange}
                    value={modalNote.modalDescription}
                    min={5} 
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={modalNote.modalTitle.length<5 || modalNote.modalDescription.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Your Notes</h2>
        <div className="container-xl text-center fs-1" style={{'marginTop': '3rem' }}>
            {notes.length === 0 && 'No Notes To Display'}
        </div>
        <div className="row">
          {notes.map((note, index) => (
            <NoteCard key={index} update={update} note={note} showAlert={props.showAlert} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesComponent;
