import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { searchNotesByQuery } from "../../actions/searchActions";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import NoteItem from "../feed/NoteItem";

const Search = ({
  search: { results, loading },
  location,
  searchNotesByQuery
}) => {
  const { text } = queryString.parse(location.search);

  useEffect(() => {
    searchNotesByQuery(text);
  }, [searchNotesByQuery, text]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary text-center">Results</h1>

      {results.length > 0 ? (
        results.map(note => <NoteItem note={note} key={note._id} />)
      ) : (
        <p className="text-center">
          We could not find anything related :( Try using other words.
        </p>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  search: PropTypes.object.isRequired,
  searchNotesByQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

const mapDispatchToProps = {
  searchNotesByQuery
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
