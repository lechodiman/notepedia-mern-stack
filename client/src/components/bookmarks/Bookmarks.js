import React, { Fragment } from "react";
import NoteItem from "../feed/NoteItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Bookmarks = ({ user: { bookmarks } }) => {
  return (
    <Fragment>
      <Link to="/" className="btn btn-light mt-2">
        <i className="fas fa-chevron-left" /> Back To Feed
      </Link>

      <h1 className="text-primary text-center">
        Reading List ({bookmarks.length})
      </h1>

      {bookmarks.length > 0 ? (
        bookmarks.map(bookmark => (
          <NoteItem key={bookmark._id} note={bookmark} />
        ))
      ) : (
        <p className="text-center">
          You don't have any bookmarks yet. Go ahead and{" "}
          <Link to="/">explore some notes</Link>
        </p>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Bookmarks);
