import React, { Component } from "react";
import { connect } from "react-redux";

export default function(InputComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuth) {
        this.context.router.history.push("/");
      }
    }
    render() {
      return <InputComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      isAuth: state.authUser.isAuth
    };
  };
  return connect(mapStateToProps)(Authenticate);
}
