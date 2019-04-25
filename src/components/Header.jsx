import React, { Component } from "react";
import { connect } from "react-redux";
import storiesLogo from "../assets/img/stories-logo.svg";
import { SignOutUser, toggleOpen } from "../redux/actions/actions";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="UserOverlay">
          <div className="overlay overlay-hugeinc " data-reactroot="">
            <button className="overlay-close">
              <i className="fas fa-minus-circle" />
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
                  <button
                    className="new-post-button button"
                    onClick={this.props.SignOutUser}
                  >
                    <span>Logout</span>
                  </button>
                ) : (
                  <li
                    onClick={this.props.toggleOpen}
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

export default connect(
  mapStateToProps,
  { toggleOpen, SignOutUser }
)(Header);
