import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CardImg } from "reactstrap";
import { connect } from "react-redux";
import Moment from "react-moment";
import { addLike, removeLike, deleteNote } from "../../actions/noteActions";
import "./feed.css";
import { addBookmark, deleteBookmark } from "../../actions/bookmarkActions";

const NoteItem = ({
  addLike,
  removeLike,
  deleteNote,
  addBookmark,
  deleteBookmark,
  auth,
  note: { _id, title, description, author, likes, comments, date },
  showActions
}) => {
  return (
    <div className="note-item bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${author._id}`}>
          <img
            className="round-img"
            src={author.avatar}
            alt={`${author.name}`}
          />
          <h4>{author.name}</h4>
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
                if (auth.user.bookmarks.map(b => b._id).includes(_id)) {
                  return deleteBookmark(auth.user._id, _id);
                }
                return addBookmark(auth.user._id, _id);
              }}
              type="button"
              className="btn btn-light"
            >
              {auth.user.bookmarks.map(b => b._id).includes(_id) ? (
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
            {auth.isAuthenticated && author._id === auth.user._id && (
              <button
                onClick={() => deleteNote(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
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
  deleteNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deleteNote, addBookmark, deleteBookmark }
)(NoteItem);
