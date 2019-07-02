import React, { Fragment } from "react";

const Information = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">About Notepedia</h1>
      <p className="lead text-justify">
        Notepedia is an open-source project created for the IIC3143 class in the
        2019-1 semester. The main purpose of this app is to give students,
        teachers (or anyone that takes notes) the ability to write, discover and
        share notes about their interests.
      </p>

      <h2 className="text-primary">Developers</h2>

      <ul>
        <li>
          <strong>Luis Chodiman</strong>{" "}
          <a
            href="https://github.com/lechodiman"
            target="_blank"
            rel="noopener noreferrer"
          >
            lechodiman
          </a>
        </li>
        <li>
          <strong>César Meneses</strong>{" "}
          <a
            href="https://github.com/cameneses"
            target="_blank"
            rel="noopener noreferrer"
          >
            cameneses
          </a>
        </li>
        <li>
          <strong>Klaus Ribbeck</strong>{" "}
          <a
            href="https://github.com/kpribbeck"
            target="_blank"
            rel="noopener noreferrer"
          >
            kpribbeck
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

export default Information;
