import React, { Fragment, useState, useEffect } from "react";
import { loadNotebooks, addNoteToNotebook } from "../../actions/notebookActions";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from "react-redux";

const AddToNotebookButton = ( { notebooks, loadNotebooks, addNoteToNotebook, note_id}) => {
  useEffect(() => {
    loadNotebooks();
  }, [loadNotebooks]);

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  }

  const displayNotebooks = (notebooks.length > -1 ?
    notebooks.map(notebook => (
    <Fragment key={notebook._id}>
      <DropdownItem onClick={(e) => addNoteToNotebook(note_id, notebook._id)}>
        {notebook.name}
      </DropdownItem>
    </Fragment>
  )) : (
    <DropdownItem disabled>You don´t have any notebooks yet!</DropdownItem>
  )
  );

  return (
    <Fragment>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
          <i class="fas fa-plus-circle" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Choose a notebook</DropdownItem>
          <DropdownItem divider />
          {displayNotebooks}
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  notebooks: state.notebooks.notebooks
});

export default connect(
  mapStateToProps,
  { loadNotebooks, addNoteToNotebook }
)(AddToNotebookButton);
