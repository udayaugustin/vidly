import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/movies" className="nav-link" aria-current="page">
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/customers" className="nav-link" aria-current="page">
                Customers
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/rental" className="nav-link" aria-current="page">
                Rental
              </NavLink>
            </li>

            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" aria-current="page">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    className="nav-link"
                    aria-current="page"
                  >
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/logout"
                    className="nav-link"
                    aria-current="page"
                  >
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
