import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getNotebook } from "../../actions/notebookActions";
import NoteItem from "../feed/NoteItem";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const Notebook = ({ notebook: { notebook, loading }, match, getNotebook }) => {
  useEffect(() => {
    getNotebook(match.params.id);
  }, [getNotebook, match.params.id]);

  if (loading || notebook === null) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-white">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/notebooks">Notebooks</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {notebook.name}
          </li>
        </ol>
      </nav>

      <h1 className="large text-secondary text-center">{notebook.name}</h1>

      {notebook.notes.length > 0 ? (
        notebook.notes.map(note => (
          <NoteItem note={note} notebook_id={match.params.id} key={note._id} />
        ))
      ) : (
        <p className="text-center">This notebook doesn't have any notes yet!</p>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  notebook: state.notebooks
});

export default connect(
  mapStateToProps,
  { getNotebook }
)(Notebook);
