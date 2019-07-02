import React, { Fragment } from "react";

const Information = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">Code of Conduct</h1>

      <p>
        All participants of Notepedia are expected to abide by our Code of
        Conduct, both online and during in-person events that are hosted and/or
        associated with Notepedia.
      </p>

      <h2 className="text-primary">Our Standards</h2>

      <p>
        Examples of behavior that contributes to creating a positive environment
        include:
      </p>

      <ul className="conduct-list">
        <li>Using welcoming and inclusive language</li>
        <li>Being respectful of differing viewpoints and experiences</li>
        <li>
          Referring to people by their preferred pronouns and using
          gender-neutral pronouns when uncertain
        </li>
      </ul>

      <p>Examples of unacceptable behavior by participants include:</p>

      <ul className="conduct-list">
        <li>
          The use of sexualized language or imagery and unwelcome sexual
          attention or advances
        </li>
        <li>
          Trolling, insulting/derogatory comments, and personal or political
          attacks
        </li>
        <li>Public or private harassment</li>
        <li>
          Publishing others' private information, such as a physical or
          electronic address, without explicit permission
        </li>
        <li>
          Other conduct which could reasonably be considered inappropriate in a
          professional setting
        </li>
        <li>Dismissing or attacking inclusion-oriented requests</li>
      </ul>
    </Fragment>
  );
};

export default Information;
