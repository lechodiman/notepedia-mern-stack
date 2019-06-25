import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNote } from "../../actions/noteActions";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { Link } from "react-router-dom";

const Note = ({ notes: { note, loading }, match, getNote, auth }) => {
  useEffect(() => {
    getNote(match.params.id);
  }, [getNote, match.params.id]);

  if (loading || note === null) {
    return <Spinner />;
  }

  return (
    <div className="note">
      <div className="row d-flex justify-content-center">
        <h1 className="note-title">{note.title}</h1>
      </div>

      <div className="row">
        <p className="note-description">{note.description}</p>
      </div>

      <div className="row">
        <div className="col-1">
          {note && (
            <img
              src={`${note.author.avatar}`}
              alt={`${note.author.name}`}
              className="rounded-circle img-fluid img-thumbnail"
            />
          )}
        </div>
        <div className="col-11">
          <p className="text-primary">{note.author.name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <p dangerouslySetInnerHTML={{ __html: note.text }} />
      </div>

      {!auth.isAuthenticated ? (
        <p>
          You can't leave a comment if you don't have an account. Go ahead and{" "}
          <Link to="/register">create one</Link>
        </p>
      ) : (
        <CommentForm noteId={note._id} />
      )}

      <div className="comments">
        {note.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} noteId={note._id} />
        ))}
      </div>
    </div>
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
