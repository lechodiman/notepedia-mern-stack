import React from "react";
import { Link } from "react-router-dom";
import { CardImg } from "reactstrap";
import { connect } from "react-redux";
import { deleteNote } from "../../actions/noteActions";
import "./feed.css";

const FeedItem = ({ auth: { user }, note, deleteNote }) => {
  const onDeleteNote = async () => {
    await deleteNote(note._id);

    window.location.reload();
  };

  let featureImg;
  if (note.feature_img) {
    featureImg = <CardImg className="feed-item-img" src={note.feature_img} />;
  }

  return (
    <div className="feed-item">
      <div className="feed-item-header row">
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

      <div className="row feature-img-container">{featureImg}</div>

      <div className="feed-item-body">
        <h2 className="large">
          <Link to={`/notes/${note._id}`}>{note.title}</Link>
        </h2>
        <p className="lead reading-font text-secondary">{note.description}</p>
      </div>

      <div className="feed-item-footer row justify-content-end">
        {/* <a
          href="#!"
          onClick={() => console.log("not implemented")}
          className="btn btn-default"
        >
          <i className="far fa-bookmark" />
        </a> */}

        {user && note.author._id === user._id ? (
          <a href="#!" onClick={onDeleteNote} className="btn btn-default">
            <i className="fas fa-trash-alt" />
          </a>
        ) : null}
      </div>

      <hr />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteNote }
)(FeedItem);
