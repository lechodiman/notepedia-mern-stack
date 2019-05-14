import React from "react";
import { Button, Card, CardTitle, CardBody, CardText } from "reactstrap";

const NotePost = ({ note }) => {
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
  };

  // TODO: work on css for notePost & add button to read note
  // TODO: add bookmark button feature
  return (
    <Card className="mt-3">
      <CardBody>
        <CardTitle style={titleStyle}>{note.title}</CardTitle>
        <CardText style={descriptionStyle}>{note.description}</CardText>
        <Button color="primary">Bookmark</Button>
      </CardBody>
    </Card>
  );
};

export default NotePost;
