import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authActions";
import {
  Collapse,
  Navbar as BootNavbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import { withRouter } from "react-router-dom";

export const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  history
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onToggle = e => {
    setIsOpen(!isOpen);
  };

  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?text=${searchText}`);
  };

  const authLinks = (
    <Fragment>
      <NavItem>
        <Link to="/notes/new" className="nav-link" onClick={onToggle}>
          New Note
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/notebooks" className="nav-link" onClick={onToggle}>
          Notebooks
        </Link>
      </NavItem>
      <NavItem>
        {isAuthenticated && user && (
          <Link
            to={`/profile/${user._id}`}
            className="nav-link"
            onClick={onToggle}
          >
            My profile
          </Link>
        )}
      </NavItem>
      <NavItem>
        <Link to="/bookmarks" className="nav-link" onClick={onToggle}>
          Bookmarks
        </Link>
      </NavItem>
      <NavItem>
        <a href="#!" onClick={logout} className="nav-link">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to="/register" className="nav-link" onClick={onToggle}>
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="nav-link" onClick={onToggle}>
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <BootNavbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Notepedia
      </Link>

      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to="/information" className="nav-link">
            All about Notepedia
          </Link>
        </NavItem>
      </Nav>

      <NavbarToggler onClick={onToggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={e => onSearchSubmit(e)}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Explore notes..."
              aria-label="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>

          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
          )}
        </Nav>
      </Collapse>
    </BootNavbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Navbar)
);
