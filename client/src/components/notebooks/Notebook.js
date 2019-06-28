import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getNotebook } from "../../actions/notebookActions";
import NoteItem from "../feed/NoteItem";
import Spinner from "../layout/Spinner";
import { Container, ListGroup, ListGroupItem, Collapse } from "reactstrap";

// TODO: Add/Remove note to/from notebook
const Notebook = ({ notebook: { notebook, loading }, match, getNotebook }) => {
  useEffect(() => {
    getNotebook(match.params.id);
  }, [getNotebook, match.params.id]);

  if (loading || notebook === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <h1 className="large text-secondary text-center">{notebook.name}</h1>

      {notebook.notes.length > 0 ? (
        notebook.notes.map(note => <NoteItem note={note} key={note._id} />)
      ) : (
        <p className="text-center">This notebook doesn't have any notes yet!</p>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  notebook: state.notebook,
  loading: state.notebook.loading
});

export default connect(
  mapStateToProps,
  { getNotebook }
)(Notebook);
