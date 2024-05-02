import React, { useContext } from "react";
import NotesComponent from "../NotesComponent/NotesComponent";
import AddNote from "../AddNote/AddNote";

function Home() {
  return (
    <div>
      <AddNote />
      <NotesComponent />
    </div>
  );
}

export default Home;
