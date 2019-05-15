import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNote } from "../../actions/noteActions";
import MediumEditor from "medium-editor";
import { withRouter } from "react-router";
import { Form, FormGroup, Label, Input } from "reactstrap";

const NoteEditor = ({ createNote, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const [text, setText] = useState("");

  const { title, description } = formData;

  useEffect(() => {
    const editor = new MediumEditor(".editable", {
      autoLink: true,
      imageDragging: true,
      delay: 1000,
      toolbar: {
        buttons: [
          "bold",
          "italic",
          "quote",
          "underline",
          "anchor",
          "h1",
          "h2",
          "h3",
          "strikethrough"
        ],
        diffLeft: 25,
        diffTop: 10
      },
      placeholder: {
        text: "Write your note..."
      }
    });

    // subscribe to changes in editable div, ie, update formData state
    editor.subscribe("editableInput", () => {
      if (typeof document !== "undefined") {
        setText(editor.getContent(0));
      }
    });
  }, []);

  const onChange = e => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value
    };

    setFormData(newState);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await createNote({ ...formData, text });
    history.push("/");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Notepedia Editor</h1>
      <Form onSubmit={e => onSubmit(e)}>
        <FormGroup>
          <Label for="exampleTitle">Title</Label>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description for your note</Label>
          <Input
            type="textarea"
            name="description"
            placeholder="Write a description"
            value={description}
            onChange={e => onChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleBody">Note: </Label>
          <div className="editable" />
        </FormGroup>
        <input type="submit" className="btn btn-primary my-1" value="Save" />
      </Form>
    </Fragment>
  );
};

NoteEditor.propTypes = {
  createNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { createNote }
)(withRouter(NoteEditor));
