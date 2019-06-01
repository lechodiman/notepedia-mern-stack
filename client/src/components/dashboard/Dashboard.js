import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import FeedItem from "../feed/FeedItem";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading && profile === null) {
    return <Spinner />;
  }

  const userNotes = profile.notes.map(note => {
    return <FeedItem note={note} key={note._id} />;
  });

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>

      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>

      <h2 className="large text-secondary text-center">My notes</h2>

      <div className="user-notes">{userNotes}</div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
