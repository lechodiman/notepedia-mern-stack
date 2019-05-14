import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardImg
} from 'reactstrap';

// TODO: Add feature_img to the view
const NotePost = ({ note }) => {

  const myContainer = {
    marginBottom: "10px"
  };

  const descriptionStyle = {
    fontFamily: "Lato sans-serif",
    fontSize: "18px",
    fontWeight: "700",
    padding: "0",
    margin: "56px 0 -13px -1.883px",
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

  // TODO: work on css for notePost
  // TODO: add bookmark button feature
  // TODO: fix warnings/errors
  return (
    <Card style={myContainer}>
      <CardBody>
        <CardImg style={imgStyle} src={note.feature_img} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn-images-1.medium.com/max/2560/1*uFINNsYNbYuPIC3sUMyy6w.jpeg"}} />
        <Link to={`/notes/${note._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <CardTitle style={titleStyle}>{note.title}</CardTitle>
        </Link>
        <CardText style={descriptionStyle}>{note.description}</CardText>
        <Button color="primary">Bookmark</Button>
      </CardBody>
    </Card>
  );
};

export default NotePost;
