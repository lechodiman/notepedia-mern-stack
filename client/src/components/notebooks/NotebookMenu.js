import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { loadNotebooks } from "../../actions/notebookActions"

import "./notebook-menu.css"

const NotebookMenu = ({ notebooks }) => {

  // useEffect(() => {
  //   loadNotebooks();
  // }, [loadNotebooks]);

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("Create");
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("Delete");
  }

  // TODO: Add button to create notebooks
  const displayNotebooks = notebooks.map((notebook) => 
      <Fragment>
        <ListGroupItem key={notebook.id} action>
            <Link 
              className="notebook-item-link" 
              to={`/notebooks/${notebook.id}`}
            >
              {notebook.name}
            </Link>
            <button
              className="btn btn-default"
              style={{float: "right"}}
              onClick={(e) => handleDelete(e, notebook.id)}
            >
              <i className="fas fa-trash-alt" />
            </button>
            
        </ListGroupItem>
      </Fragment>
    );

  
  return (
    <div>
      <Row>
        <div style={{margin: "0 auto"}}>
          <h1 className="large text-secondary text-center">My Notebooks</h1>
          <button
            className="btn btn-default"
            style={{ float: "right" }}
            onClick={(e) => handleCreate(e)}
          >
            <i className="fas fa-plus-circle fa-2x"></i>
          </button>
        </div>
      </Row>
      {displayNotebooks.length > 0 ? (
        <Container className="notebook-container">
          <ListGroup >
            {displayNotebooks}
          </ListGroup>
        </Container>
      ) : (
        <p className="text-center"> You don´t have any notebooks yet!</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  notebooks: state.notebook.notebooks
});

export default connect(mapStateToProps, { loadNotebooks })(NotebookMenu);
