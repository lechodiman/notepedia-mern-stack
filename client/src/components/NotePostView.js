import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardImg
} from "reactstrap";
import { connect } from "react-redux";
import { deleteNote } from "../actions/noteActions";

// TODO: Add feature_img to the view
const NotePost = ({ note, deleteNote }) => {
  const myContainer = {
    marginBottom: "10px"
  };

  const descriptionStyle = {
    fontFamily: "Lato sans-serif",
    fontSize: "18px",
    fontWeight: "700",
    padding: "0",
    textAlign: "left",
    lineHeight: "34.5px",
    letterSpacing: "-0.45px"
  };

  const titleStyle = {
    fontFamily: "Playfair Display serif",
    fontSize: "34px",
    textAlign: "left",
    marginBottom: "8px"
  };

  const imgStyle = {
    width: "100%",
    height: "12vw",
    objectFit: "cover"
  };

  let featureImg = null;
  if (note.feature_img) {
    featureImg = <CardImg style={imgStyle} src={note.feature_img} />;
  }

  // TODO: work on css for notePost
  // TODO: add bookmark button feature
  // TODO: fix warnings/errors
  return (
    <Card style={myContainer}>
      <CardBody>
        {featureImg}
        <Link
          to={`/notes/${note._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardTitle style={titleStyle}>{note.title}</CardTitle>
        </Link>
        <CardText style={descriptionStyle}>{note.description}</CardText>
        <Button color="primary">Bookmark</Button>
      </CardBody>

      <Button onClick={() => deleteNote(note._id)}> Delete note</Button>
    </Card>
  );
};

export default connect(
  null,
  { deleteNote }
)(NotePost);
