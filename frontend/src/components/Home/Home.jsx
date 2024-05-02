import React, { useContext } from "react";
import NotesComponent from "../NotesComponent/NotesComponent";
import AddNote from "../AddNote/AddNote";

function Home(props) {
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <NotesComponent showAlert={props.showAlert} />
    </div>
  );
}

export default Home;
