import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
} from 'reactstrap';

// TODO: Add feature_img to the view
const NotePost = props => {

  const myContainer = {
    marginBottom: "10px"
  }

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
    fontSize: "40px",
    textAlign: "left",
    marginBottom: "8px"
  }

  // TODO: work on css for notePost
  // TODO: add bookmark button feature
  // TODO: fix warnings/errors
  return (
    <Card style={myContainer}>
      <CardBody>
        <li key={props.id}>
          <Link to={'/notes/${props._id}'} style={{ textDecoration: 'none', color: 'black' }}>
            <CardTitle style={titleStyle}>{props.title}</CardTitle>
          </Link>
        </li>
        <CardText style={descriptionStyle}>{props.description}</CardText>
        <Button color="primary">Bookmark</Button>
      </CardBody>
    </Card>
  );
};

export default NotePost;
