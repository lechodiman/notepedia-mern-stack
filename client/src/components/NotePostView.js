import React, { Fragment } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardImg
} from 'reactstrap';


const NotePost = props => {

  const myContainer = {
    display: "grid"
  }
  const myRow = {
    gridTemplateRows: "5px 1fr 2px"
  }

  const descriptionStyle = {
    fontFamily: "Lato sans-serif",
    fontSize: "26px",
    fontWeight: "700",
    padding: "0",
    margin: "56px 0 -13px -1.883px",
    textAlign: "left",
    lineHeight: "34.5px",
    letterSpacing: "-0.45px"
  };

  const titleStyle = {
    fontFamily: "Playfair Display serif",
    fontSize: "48px",
    textAlign: "left",
    marginBottom: "8px"
  }

  // TODO: work on css for notePost & add button to read note
  // TODO: add bookmark button feature
  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle style={titleStyle}>{props.title}</CardTitle>
          <CardText style={descriptionStyle}>{props.description}</CardText>
          <Button color="primary">Bookmark</Button>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NotePost;
