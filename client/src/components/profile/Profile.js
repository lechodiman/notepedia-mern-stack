import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profileActions";
import NoteItem from "../feed/NoteItem";
import { Link } from "react-router-dom";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light mt-2">
        Back To Profiles
      </Link>

      <h2 className="large text-secondary text-center">
        {" "}
        {profile.user.name}'s Notes
      </h2>

      <div className="user-notes">
        {profile.notes.map(note => (
          <NoteItem note={note} key={note._id} />
        ))}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
