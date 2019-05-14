import React, { useEffect, Fragment } from "react";
import { loadNotes } from "../actions/noteActions";
import NotePost from "./NotePostView";
import { connect } from "react-redux";

const Feed = ({ notes, loadNotes }) => {
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Maps notes retrieved from the DB into NotePost components to display in feed
  const displayNotes = notes.map(note => (
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
  notes: state.notes.notes
});

export default connect(
  mapStateToProps,
  { loadNotes }
)(Feed);
