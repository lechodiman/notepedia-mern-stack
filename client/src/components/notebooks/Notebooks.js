import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadNotebooks, createNotebook, editNotebook, deleteNotebook } from "../../actions/notebookActions"
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


const Notebooks = ({ notebooks, loadNotebooks, createNotebook, editNotebook, deleteNotebook }) => {

  useEffect(() => {
    loadNotebooks();
  }, );

  const [isOpen, setOpen] = useState(false);

  const [newNotebookName, setNewName] = useState("");

  const [activeIndex, setActiveIndex] = useState(undefined);

  const [editNotebookName, setEditName] = useState("");


  const onChangeNew = e => {
    setNewName(e.target.value);
  };

  const onChangeEdit = e => {
    setEditName(e.target.value);
  };

  const toggleNewNotebook = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  }

  const toggleEdit = (e, index) => {
    e.preventDefault();
    if (activeIndex !== index || activeIndex === undefined) setEditName("");
    setActiveIndex(activeIndex === index ? undefined : index);
  }

  const handleCreate = async e => {
    e.preventDefault();
    await createNotebook({name: newNotebookName});
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteNotebook(id);
  }

  const handleEdit = async (e, id) => {
    e.preventDefault();
    await editNotebook({id: id, name: editNotebookName});
  }

  const displayNotebooks = notebooks.map((notebook) => 
      <Fragment key={notebook._id}>
        <ListGroupItem action>
            <Link 
              className="notebook-item-link"
              to={`/notebooks/${notebook._id}`}
            >
              {notebook.name}
            </Link>
            <button
              className="btn btn-default"
              style={{float: "right"}}
              onClick={(e) => handleDelete(e, notebook._id)}
            >
              <i className="fas fa-trash-alt" />
            </button>
            <button
              className="btn btn-default"
              style={{float: "right"}} 
              onClick={(e) => toggleEdit(e, notebook._id)}
            >
              <i className="fas fa-edit" />
            </button>
        </ListGroupItem>
        <Collapse isOpen={activeIndex === notebook._id}>
          <Row>
            <InputGroup className="notebook-edit-input">
              <Input placeholder="New name" onChange={onChangeEdit} value={editNotebookName} />
              <InputGroupAddon addonType="append">
                <Button onClick={(e, ) => handleEdit(e, notebook._id)}>Edit</Button>
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
          <InputGroup className="notebook-create-input">
            <Input placeholder="Notebook name" onChange={onChangeNew} />
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

export default connect(mapStateToProps, { loadNotebooks, createNotebook, editNotebook, deleteNotebook })(Notebooks);
