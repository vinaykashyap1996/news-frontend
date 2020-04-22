import React, { useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { signout } from "../api/index";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#FFF5F8" };
  else return { color: "#ffffff" };
};

const SimpleMenu = (history, isLoggedIn) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="root">
      <AppBar className="menu-appbar" position="static">
        <Toolbar className="tool-bar">
          {!history.isLoggedIn && (
            <div className={"Menudiv"}>
              <div style={{ float: "right" }}>
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
              </div>
              <Typography variant="h6" className="title">
                News
              </Typography>
            </div>
          )}
          {history.isLoggedIn && (
            <div className={"Menudiv"}>
              <div style={{ float: "right" }}>
                {history.location.pathname !== "/profile" &&
                  history.location.pathname !== "/task" && (
                    <span className="Linkdiv">
                      <Link
                        className="nav-link"
                        style={isActive(history, "/profile")}
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </span>
                  )}
                <span>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <SettingsIcon />
                  </Button>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {history.location.pathname !== "/language" &&
                      history.location.pathname !== "/task" && (
                        <MenuItem id="lang" onClick={handleClose}>
                          <>
                            <Link
                              className="nav-link"
                              style={
                                (isActive(history, "/language"),
                                {
                                  cursor: "pointer",
                                  color: "Black"
                                })
                              }
                              to={{ pathname: "/language", query: "lang" }}
                            >
                              Change Language
                            </Link>
                          </>
                        </MenuItem>
                      )}
                    {history.location.pathname !== "/category" &&
                      history.location.pathname !== "/task" && (
                        <MenuItem id="cate" onClick={handleClose}>
                          <>
                            <Link
                              className="nav-link"
                              style={
                                (isActive(history, "/category"),
                                {
                                  cursor: "pointer",
                                  color: "Black"
                                })
                              }
                              to="/category"
                            >
                              Change Category
                            </Link>
                          </>
                        </MenuItem>
                      )}
                    {history.location.pathname !== "/changepassword" && (
                      <MenuItem id="change" onClick={handleClose}>
                        <>
                          <Link
                            className="nav-link"
                            style={
                              (isActive(history, "/changepassword"),
                              { cursor: "pointer", color: "Black" })
                            }
                            to="/changepassword"
                          >
                            Change Password
                          </Link>
                        </>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>
                      <>
                        <ul>
                          <li className="nav-item">
                            <a
                              href="/signin"
                              className="nav-link"
                              style={
                                (isActive(history, "/profile"),
                                { cursor: "pointer", color: "Black" })
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
                      </>
                    </MenuItem>
                  </Menu>
                </span>
              </div>
              <Typography variant="h6" className="title">
                News
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(SimpleMenu);
