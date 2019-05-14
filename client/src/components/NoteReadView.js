import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getNote } from "../actions/noteActions";
import Spinner from "./layout/Spinner";

// TODO: Add a correct route to the component
// TODO: Create loadSingleNote action/reducer
// TODO: Connect NoteReadView with a specific note - via onClick event on NotePost
// TODO: Display note content (Analize note model and how to display it correctly, considering images, fonts, quotes, etc)
// TODO: Add clap & bookmark button
// TODO: Add comments section
// TODO: Add Highlight feature
const NoteReadView = ({ notes: {note, loading}, match, getNote }) => {


  useEffect(() => {
    getNote(match.params.id);
  }, [getNote, match.params.id]);

  const myLayout = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 10px 740px 10px 1fr 1fr"
  };

  const imgStyle = {
    gridColumn: "2 / -2",
    margin: "20px 0",
    width: "100%"
  };

  const noteBlockQuote = {
    gridColumn: "3 / 5",
    paddingLeft: "10px",
    color: "#666",
    borderLeft: "3px solid black"
  };

  const asideText = {
    gridColumn: "5"
  };

  const descriptionStyle = {
    gridColumn: "4",
    fontFamily: "Lato sans-serif",
    fontSize: "18px",
    fontWeight: "700",
    margin: "56px 0 -13px -1.883px",
    textAlign: "left",
    letterSpacing: "-0.45px"
  };

  const titleStyle = {
    gridColumn: "4",
    fontFamily: "Playfair Display serif",
    fontSize: "48px",
    textAlign: "center",
    marginTop: "10px"
  };

  if (loading) {
    return <Spinner />
  }

  // TODO: Add author avatar and name with link to profile
  return (
    <Fragment>
      <div style={myLayout}>
        <div style={titleStyle}>{note.title}</div>
        <div style={descriptionStyle}>{note.description}</div>
        <img style={imgStyle} src={note.feature_img} alt="feature_img" onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn-images-1.medium.com/max/2560/1*uFINNsYNbYuPIC3sUMyy6w.jpeg"}} />
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(
  mapStateToProps,
  { getNote }
)(NoteReadView);
