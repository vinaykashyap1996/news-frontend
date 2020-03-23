import React from "react";
import "./Menu.css";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { signout } from "../api/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#FFF5F8" };
  else return { color: "#ffffff" };
};

const Menu = ({ history, isLoggedIn }) => (
  <div className="root">
    <AppBar className="menu-appbar" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          className="title"
          onClick={() => {
            history.push("/");
          }}
        >
          News
        </Typography>
        {!isLoggedIn && (
          <span className="Linkdiv">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>

            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </span>
        )}

        {isLoggedIn && (
          <>
            <span>
              <ul>
                <li className="nav-item">
                  <a
                    href="/signin"
                    className="nav-link"
                    style={
                      (isActive(history, "/profile"),
                      { cursor: "pointer", color: "#fff" })
                    }
                    onClick={() =>
                      signout(() => {
                        history.push("/signin");
                      })
                    }
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </span>
          </>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

export default withRouter(Menu);
