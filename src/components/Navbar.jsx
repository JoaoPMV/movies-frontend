import React from "react";
import "./Navbar.css";
import { logout } from "../../api.js";

const Navbar = () => {
  async function handleLogout() {
    await logout();
    window.location.href = "/login";
  }
  return (
    <div>
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid teste-nav">
          <a className="nav-link" aria-current="page" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleLogout();
                  }}
                >
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
