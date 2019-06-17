import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import "./notebook-menu.css"

const NotebookMenu = ({ notebooks }) => {
  console.log(notebooks);


  // TODO: Add button to create notebooks
  // TODO: Add colapse feature to notebooks
  // TODO: Create action to fetch notebooks
  const displayNotebooks = notebooks.map((notebook) => 
      <ListGroupItem>
        {notebook.name}
      </ListGroupItem>
    );

  
  return (
    <Container className="side-menu-container">
      <ListGroup>
        {displayNotebooks}
      </ListGroup>
    </Container>
  );


  
};

const mapStateToProps = state => ({
  notebooks: state.notebook.notebooks
});

export default connect(mapStateToProps)(NotebookMenu);
