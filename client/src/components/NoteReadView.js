import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { loadSingleNote } from "../actions/noteActions";

// TODO: Add a correct route to the component
// TODO: Create loadSingleNote action/reducer
// TODO: Connect NoteReadView with a specific note - via onClick event on NotePost
// TODO: Display note content (Analize note model and how to display it correctly, considering images, fonts, quotes, etc)
// TODO: Add clap & bookmark button
// TODO: Add comments section
// TODO: Add Highlight feature
const NoteReadView = ({ myNote, loadSingleNote }) => {


  useEffect(() => {
    loadSingleNote();
  }, [loadSingleNote]);

  const myLayout = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 10px 740px 10px 1fr 1fr"
  }

  const noteSection = {
    gridColumn: "4"
  }

  const noteFigure = {
    gridColumn: "2 / -2",
    margin: "20px 0"
  }

  const noteBlockQuote = {
    gridColumn: "3 / 5",
    paddingLeft: "10px",
    color: "#666",
    borderLeft: "3px solid black"
  }

  const asideText = {
    gridColumn: "5"
  }

  return (
    <Fragment>
      <div style={myLayout}>
        <div style={noteSection}>{myNote.title}</div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  myNote: state.notes.myNote
});

export default connect(
  mapStateToProps,
  { loadSingleNote }
)(NoteReadView);
