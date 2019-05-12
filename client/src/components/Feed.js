import React, { useEffect } from "react";
import { loadNotes } from "../actions/noteActions";
import NotePost from "./NotePostView";
import { connect } from "react-redux";

const Feed = ({ notes, loadNotes }) => {

  useEffect(() => {
    loadNotes();
    console.log("Im inside my effect hook.");
  }, []);

  const feedLayout = {
    display: "grid",
    gridTemplateColumns: "300px 1fr 440px 1fr 300px"
  };

  const feedPost = {
    gridColumn: "3"
  };

  // Maps notes retrieved from the DB into NotePost components to display in feed
  const displayNotes = notes.map(note => (
    <NotePost title={note.title} description={note.description} />
  ));

  return (
    <div style={feedLayout}>
      <div style={feedPost}>
        {displayNotes}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notes.notes
});

export default connect(
  mapStateToProps,
  { loadNotes }
)(Feed);
