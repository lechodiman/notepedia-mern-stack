import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNote, addLike, removeLike } from "../../actions/noteActions";
import Spinner from "../layout/Spinner";
import LikeButton from "../layout/LikeButton";
import "./note.css";

// TODO: Add comments section
// TODO: Add Highlight feature
const Note = ({ notes: { note, loading }, match, getNote }) => {
  useEffect(() => {
    getNote(match.params.id);
  }, [getNote, match.params.id]);

  if (loading) {
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

      <div className="row">
        <LikeButton _id={note._id} likes={note.likes} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(
  mapStateToProps,
  { getNote }
)(Note);
