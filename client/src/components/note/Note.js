import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNote } from "../../actions/noteActions";
import Spinner from "../layout/Spinner";
import "./note.css";

// TODO: Display note content (Analyze note model and how to display it correctly, considering images, fonts, quotes, etc)
// TODO: Add clap & bookmark button
// TODO: Add comments section
// TODO: Add Highlight feature
const Note = ({ notes: { note, loading }, match, getNote }) => {
  useEffect(() => {
    getNote(match.params.id);
  }, [getNote, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  let featureImg = null;
  if (note.feature_img) {
    featureImg = (
      <img
        src={note.feature_img}
        alt="feature_img"
        className="img-responsive note-feature-img"
      />
    );
  }

  // TODO: Add author avatar and name with link to profile
  return (
    <div className="note">
      <div className="row d-flex justify-content-center">
        <h1 className="large text-primary">{note.title}</h1>
      </div>

      <div className="row">
        <p className="lead">{note.description}</p>
      </div>

      <div className="row">{featureImg}</div>

      <div className="row">
        <p dangerouslySetInnerHTML={{ __html: note.text }} />
      </div>

      <div className="row">
        <a
          href="#!"
          onClick={() => console.log("holi")}
          className="btn btn-disabled"
        >
          <i className="far fa-heart" />
        </a>
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
