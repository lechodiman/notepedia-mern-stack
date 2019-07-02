import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { searchNotesByQuery } from "../../actions/searchActions";

const Search = ({ location }) => {
  const { text } = queryString.parse(location.search);
  const [page, setPage] = useState(0);

  useEffect(() => {
    searchNotesByQuery(text, page);

    setPage(page + 1);
  }, []);

  return (
    <div>
      <strong>Values Props: </strong>
      {JSON.stringify(text, null, 2)}
    </div>
  );
};

Search.propTypes = {};

export default Search;
