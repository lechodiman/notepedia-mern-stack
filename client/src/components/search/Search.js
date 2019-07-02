import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

const Search = ({ match, location }) => {
  const { text } = queryString.parse(location.search);

  return (
    <div>
      <strong>Values Props: </strong>
      {JSON.stringify(text, null, 2)}
    </div>
  );
};

Search.propTypes = {};

export default Search;
