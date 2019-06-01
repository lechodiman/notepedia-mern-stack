import React, { useEffect, Fragment } from "react";
import { loadNotes } from "../../actions/noteActions";
import FeedItem from "./FeedItem";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Feed = ({ notes: { notes, loading }, loadNotes }) => {
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Maps notes retrieved from the DB into NotePost components to display in feed
  const displayNotes = notes
    .map(note => <FeedItem note={note} key={note._id} />)
    .reverse();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-secondary text-center">Recent Notes</h1>
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
