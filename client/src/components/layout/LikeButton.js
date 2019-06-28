import React, { Fragment } from "react";
import { addLike, removeLike } from "../../actions/noteActions";
import { connect } from "react-redux";

const LikeButton = ({ addLike, removeLike, _id, likes }) => {
  return (
    <Fragment>
      <button onClick={e => addLike(_id)} type="button" class="btn btn-light">
        <i class="fas fa-thumbs-up" />{" "}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button
        onClick={e => removeLike(_id)}
        type="button"
        class="btn btn-light"
      >
        <i class="fas fa-thumbs-down" />
      </button>
    </Fragment>
  );
};

export default connect(
  null,
  { addLike, removeLike }
)(LikeButton);
