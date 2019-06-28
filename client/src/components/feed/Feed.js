import React, { useEffect, Fragment } from "react";
import { loadNotes } from "../../actions/noteActions";
import NoteItem from "./NoteItem";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Feed = ({ notes: { notes, loading }, loadNotes }) => {
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Maps notes retrieved from the DB into NotePost components to display in feed
  const displayNotes = notes
    .map(note => <NoteItem note={note} key={note._id} />)
    .reverse();

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-secondary text-center">Recent Notes</h1>

      <p className="lead mb-3 text-center">
        <i className="fas fa-user" />
        Welcome to Notepedia
      </p>

      {displayNotes.length > 0 ? (
        displayNotes
      ) : (
        <p className="text-center"> We don't have notes here yet!</p>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(
  mapStateToProps,
  { loadNotes }
)(Feed);
