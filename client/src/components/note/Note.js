import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getNote } from "../../actions/noteActions";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";
import NoteItem from "../feed/NoteItem";

const Note = ({ notes: { note, loading }, match, getNote, auth }) => {
  useEffect(() => {
    getNote(match.params.id);
  }, [getNote, match.params.id]);

  if (loading || note === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="mt-3">
        <NoteItem note={note} />
      </div>

      <div className="row mt-4">
        <p dangerouslySetInnerHTML={{ __html: note.text }} />
      </div>

      {!auth.isAuthenticated ? (
        <p>
          You can't leave a comment if you don't have an account. Go ahead and{" "}
          <Link to="/register">create one</Link> or just{" "}
          <Link to="/login">login</Link>
        </p>
      ) : (
        <CommentForm noteId={note._id} />
      )}

      <div className="comments">
        {note.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} noteId={note._id} />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  notes: state.notes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getNote }
)(Note);
