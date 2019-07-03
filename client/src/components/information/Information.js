import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">More information about Notepedia!</h1>
      <ul className="list-group">
        <Link to="/" className="list-group-item list-group-item-action">
          Home
        </Link>
        <Link to="/about" className="list-group-item list-group-item-action">
          About
        </Link>
        <Link
          to="/code-of-conduct"
          className="list-group-item list-group-item-action"
        >
          Code of Conduct
        </Link>
      </ul>
    </Fragment>
  );
};

export default Information;
