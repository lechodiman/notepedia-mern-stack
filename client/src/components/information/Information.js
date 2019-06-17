import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <Fragment>
      <h1>More information about Notepedia!</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/code-of-conduct">Code of Conduct</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Information;
