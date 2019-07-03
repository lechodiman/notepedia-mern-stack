import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <Fragment>
      <Link to="/" className="btn btn-light mt-2">
        <i className="fas fa-chevron-left" /> Back To Feed
      </Link>

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
