import React, { useEffect, Fragment } from "react";
import { loadNotes } from "../actions/noteActions";
import NotePost from "./NotePostView";
import { connect } from "react-redux";

const Feed = ({ allNotes, loadNotes }) => {
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Maps notes retrieved from the DB into NotePost components to display in feed
  const displayNotes = allNotes.map(note => (
    <NotePost note={note} key={note._id} />
  ));

  return (
    <Fragment>
      <h1 className="large text-secondary text-center">Recent Notes</h1>
      {displayNotes}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  allNotes: state.notes.allNotes
});

export default connect(
  mapStateToProps,
  { loadNotes }
)(Feed);
