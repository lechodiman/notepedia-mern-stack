import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addLike, removeLike, deleteNote } from "../../actions/noteActions";
import { removeNoteFromNotebook } from "../../actions/notebookActions";
import AddToNotebookButton from "../layout/AddToNotebookButton";
import { addBookmark, deleteBookmark } from "../../actions/bookmarkActions";
import { setAlert } from "../../actions/alertActions";

const NoteItem = ({
  addLike,
  removeLike,
  deleteNote,
  removeNoteFromNotebook,
  notebook_id,
  addBookmark,
  deleteBookmark,
  setAlert,
  auth,
  note: {
    _id,
    title,
    description,
    author,
    likes,
    comments,
    date,
    avatar,
    name
  },
  history,
  showActions
}) => {
  return (
    <div className="note-item bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${author._id}`}>
          <img className="round-img" src={avatar} alt={`${name}`} />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <Link to={`/notes/${_id}`}>
          <h3 className="my-1">{title}</h3>
        </Link>
        <p>{description}</p>
        <p className="note-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>

            <button
              onClick={() => {
                if (!auth.isAuthenticated || !auth.user) {
                  setAlert(
                    "You must be logged in to bookmark a note",
                    "danger"
                  );
                  history.push("/login");
                  return;
                }

                if (auth.user.bookmarks.map(b => b._id).includes(_id)) {
                  return deleteBookmark(_id);
                }
                return addBookmark(auth.user._id, _id);
              }}
              type="button"
              className="btn btn-light"
            >
              {auth.isAuthenticated &&
              auth.user &&
              auth.user.bookmarks.map(b => b._id).includes(_id) ? (
                <i className="fas fa-bookmark" />
              ) : (
                <i className="far fa-bookmark" />
              )}
            </button>

            <Link to={`/notes/${_id}`} className="btn btn-primary">
              Comments{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {auth.isAuthenticated && auth.user && author._id === auth.user._id && (
              <button
                onClick={() => deleteNote(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}

            {auth.user && <AddToNotebookButton note_id={_id} />}

            {window.location.href.includes("notebooks") && (
              <button
                onClick={() => removeNoteFromNotebook(_id, notebook_id)}
                type="button"
                className="btn btn-danger"
              >
                Remove
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

NoteItem.defaultProps = {
  showActions: true
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      addLike,
      removeLike,
      deleteNote,
      addBookmark,
      deleteBookmark,
      setAlert,
      removeNoteFromNotebook
    }
  )(NoteItem)
);
