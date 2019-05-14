import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNote, getNote } from "../../actions/noteActions";

const NoteEditor = ({ createNote, history }) => {
  const [editorData, setEditorData] = useState({
    text: "",
    title: "",
    claps: "",
    description: "",
    feature_img: "",
    author: ""
  });

  //   useEffect(() => {
  //     getNote();

  //     setEditorData({
  //       text: loading || !note.text ? "" : note.text,
  //       title: loading || !note.title ? "" : note.title,
  //       claps: loading || !note.claps ? "" : note.claps,
  //       description: loading || !note.description ? "" : note.description,
  //       feature_img: loading || !note.feature_img ? "" : note.feature_img,
  //       author: loading || !note.author ? "" : note.author,
  //     });
  //   }, [loading, getNote]);

  const { text, title, claps, description, feature_img, author } = editorData;

  const onSubmit = e => {
    e.preventDefault();
    createNote(editorData, history, true);
  };

  const onChange = e =>
    setEditorData({ ...editorData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">Notepedia Editor</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Note Title</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Write a description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Description for your note</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Write a note"
            name="text"
            value={text}
            onChange={e => onChange(e)}
          />
          <small className="form-text">The body of your note</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Save" />
      </form>
    </Fragment>
  );
};

NoteEditor.propTypes = {
  createNote: PropTypes.func.isRequired,
  getNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { createNote, getNote }
)(withRouter(NoteEditor));
