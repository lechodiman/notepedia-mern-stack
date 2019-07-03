import React, { Fragment, useState, useEffect } from "react";
import {
  loadNotebooks,
  addNoteToNotebook
} from "../../actions/notebookActions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";

const AddToNotebookButton = ({
  notebooks,
  loadNotebooks,
  addNoteToNotebook,
  note_id
}) => {
  useEffect(() => {
    loadNotebooks();
  }, [loadNotebooks]);

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const displayNotebooks =
    notebooks.length > -1 ? (
      notebooks.map(notebook => (
        <Fragment key={notebook._id}>
          <DropdownItem onClick={e => addNoteToNotebook(note_id, notebook._id)}>
            {notebook.name}
          </DropdownItem>
        </Fragment>
      ))
    ) : (
      <DropdownItem disabled>You don´t have any notebooks yet!</DropdownItem>
    );

  return (
    <Dropdown isOpen={isOpen} toggle={toggle} className="d-inline-block">
      <DropdownToggle color="light">
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Choose a notebook</DropdownItem>
        <DropdownItem divider />
        {displayNotebooks}
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = state => ({
  notebooks: state.notebooks.notebooks
});

export default connect(
  mapStateToProps,
  { loadNotebooks, addNoteToNotebook }
)(AddToNotebookButton);
