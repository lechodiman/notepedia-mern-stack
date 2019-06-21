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

const Notebooks = ({ notebooks }) => {

  // useEffect((id) => {
  //   loadNotebooks(id);
  // }, [loadNotebooks]);

  const [isOpen, setOpen] = useState(false);

  const [newNotebookName, setNewName] = useState("");

  const [activeIndex, setActiveIndex] = useState(undefined);

  const onChange = e => {
    setNewName(e.target.value);
  };

  const toggleNewNotebook = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  }

  const toggleEdit = (e, index) => {
    e.preventDefault();
    setActiveIndex(activeIndex === index ? undefined : index);
  }

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("Create: " + newNotebookName);
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("Delete");
  }

  const handleEdit = (e, id) => {
    e.preventDefault();
    console.log("Edit");
  }

  const displayNotebooks = notebooks.map((notebook) => 
      <Fragment key={notebook.id}>
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
            <button
              className="btn btn-default"
              style={{float: "right"}} 
              onClick={(e) => toggleEdit(e, notebook.id)}
            >
              <i className="fas fa-edit" />
            </button>
        </ListGroupItem>
        <Collapse isOpen={activeIndex === notebook.id}>
          <Row>
            <InputGroup className="notebook-edit-input">
              <Input placeholder="New name" onChange={onChange} />
              <InputGroupAddon addonType="append">
                <Button onClick={(e, ) => handleEdit(e, notebook.id)}>Create</Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
        </Collapse>
      </Fragment>
    );

  
  return (
    <div>
      <Row>
        <div style={{margin: "0 auto"}}>
          <h1 className="large text-secondary text-center">My Notebooks</h1>
          <button
            className="btn btn-default"
            style={{ marginLeft: "105px" }}
            onClick={(e) => toggleNewNotebook(e)}
          >
            <i className="fas fa-plus-circle fa-2x"></i>
          </button>
        </div>
      </Row>
      <Collapse isOpen={isOpen}>
        <Row>
          <InputGroup style="notebook-create-inputss">
            <Input placeholder="Notebook name" onChange={onChange} />
            <InputGroupAddon addonType="append">
              <Button onClick={(e) => handleCreate(e)}>Create</Button>
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

export default connect(mapStateToProps, { loadNotebooks })(Notebooks);
