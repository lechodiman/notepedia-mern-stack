import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Component to show current alerts in the state. It only displays them if the alerts array is not empty */
const Alert = ({ alerts }) => {
  if (alert !== null && alerts.length > 0) {
    return alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }

  return null;
};

// Define types for the props of this component. If types don't match, it will throw an error so it is good practice
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
