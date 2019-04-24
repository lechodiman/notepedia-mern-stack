import React, { Component } from "react";
import { connect } from "react-redux";
import storiesLogo from "../assets/img/stories-logo.svg";
class Header extends Component {
  render() {
    return (
      <div>
        <div className="UserOverlay" data-react-props="{}">
          <div className="overlay overlay-hugeinc " data-reactroot="">
            <button className="overlay-close">
              <span className="glyphicon glyphicon-remove" />
            </button>
            <nav className="users-overlay">
              <h2 className="grayed-heading center" />
              <ul>
                <li className="pagination-button-group" />
              </ul>
            </nav>
          </div>
        </div>
        <div data-behavior="progress-bar" className="progress-bar" />
        <nav
          data-behavior="animated-navbar"
          className="navbar navbar-default navbar-fixed-top is-inView"
        >
          <div className="container-fluid col-md-10 col-md-offset-1">
            <div className="navbar-header">
              <a className="navbar-brand" id="logo" href="/">
                <img alt="Stories" src={storiesLogo} height="40" />
              </a>
            </div>
            <ul className="nav navbar-nav filter-links">
              <li>
                <a className="" href="/">
                  Top stories
                </a>
              </li>
            </ul>
            <div className="folding-nav">
              <ul className="nav navbar-nav navbar-right">
                {this.props.isAuth ? (
                  <li className="new-post-button">
                    <a
                      className="button"
                      data-behavior="trigger-overlay"
                      href="/editor"
                    >
                      Write a story
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {this.props.isAuth ? (
                  ""
                ) : (
                  <li
                    onClick={this.props.openSignInWith}
                    className="sign-in-button"
                  >
                    <a
                      className="button green-border-button"
                      data-behavior="trigger-overlay"
                      href="#"
                    >
                      Sign in / Sign up
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authUser.user,
    isAuth: state.authUser.isAuth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSignInWith: () => {
      dispatch({ type: "TOGGLE_MODAL", modalMode: true });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
