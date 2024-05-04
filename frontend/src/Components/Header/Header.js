import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../Redux/slices/userLoginSlice";

function Header() {
  const { loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signout() {
    dispatch(resetState());
    navigate("/");
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg nav-bar-body">
        <div className="container-fluid p-2">
          <NavLink className="navbar-brand" to="/">
            Journal
          </NavLink>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {loginStatus ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/journal"
                    >
                      My Journal
                    </NavLink>
                  </li>
                  <li className="nav-item float-end">
                    <button className="btn btn-danger" onClick={signout}>
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/signup"
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
