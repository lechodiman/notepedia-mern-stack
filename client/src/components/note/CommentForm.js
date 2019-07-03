import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/noteActions";

const CommentForm = ({ noteId, addComment }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p-2 text-white">
        <h3 className="lead">Leave a Comment</h3>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addComment(noteId, { text });
          setText("");
        }}
      >
        <div className="form-group">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a comment"
            value={text}
            onChange={e => setText(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
