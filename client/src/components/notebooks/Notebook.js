import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getNotebook } from "../../actions/notebookActions";
import FeedItem from "../feed/FeedItem";
import Spinner from "../layout/Spinner";
import { Container, ListGroup, ListGroupItem, Collapse } from "reactstrap";

const Notebook = ({ name, notes, loading, match, getNotebook}) => {
  useEffect(() => {
    console.log(match.params.id);
    getNotebook(match.params.id);
  }, [getNotebook, match.params.id]);
  
  // const displayNotes = notes
  //   .map(note => <FeedItem note={note} key={note._id} />)
  //   .reverse();
  
  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-secondary text-center">{name}</h1>
    </Fragment>
  );
};
  const mapStateToProps = state => ({
    name: state.notebook.name,
    notes: state.notebook.notes,
    loading: state.notebook.loading
  });
  
export default connect(mapStateToProps, { getNotebook })(Notebook);