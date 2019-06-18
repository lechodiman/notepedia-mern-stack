import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadNotebooks } from "../../actions/notebookActions"
import { 
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Collapse,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import "./notebook-menu.css"

const NotebookMenu = ({ notebooks }) => {

  // useEffect(() => {
  //   loadNotebooks();
  // }, [loadNotebooks]);

  const [isOpen, setOpen] = useState(false);

  const [newNotebookName, setNewName] = useState("");

  const onChange = e => {
    setNewName(e.target.value);
  };

  const toggle = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  }

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("Create: " + newNotebookName);
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("Delete");
  }

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
            onClick={(e) => toggle(e)}
          >
            <i className="fas fa-plus-circle fa-2x"></i>
          </button>
        </div>
      </Row>
      <Collapse isOpen={isOpen}>
        <Row>
          <InputGroup style={{ width: "500px", margin: "0 auto", marginBottom: "10px", marginTop: "5px" }}>
            <Input placeholder="Notebook name" onChange={onChange} />
            <InputGroupAddon addonType="append">
              <Button onClick={(e, ) => handleCreate(e, )}>Create</Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      </Collapse>
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
