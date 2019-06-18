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

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = e => {
    setIsOpen(!isOpen);
  };

  const authLinks = (
    <Nav className="ml-auto" navbar>
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
        <Link to="/dashboard" className="nav-link" onClick={onToggle}>
          Dashboard
        </Link>
      </NavItem>
      <NavItem>
        <a href="#!" onClick={logout} className="nav-link">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto" navbar>
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
    </Nav>
  );

  return (
    <BootNavbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Notepedia
      </Link>

      <NavbarToggler onClick={onToggle} />

      <Collapse isOpen={isOpen} navbar>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
        )}
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

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
