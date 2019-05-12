import React from "react";
import { Button } from 'reactstrap';


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

  return (
    <div>
      <div style={myContainer}>
        <div style={myRow}>
          <h1 style={titleStyle}>{props.title}</h1>
        </div>
          <div style={descriptionStyle}>{props.description}</div>
          <Button color="primary">Clap</Button>
          <i class="far fa-heart" />
      </div>
    </div>
  );
};

export default NotePost;
