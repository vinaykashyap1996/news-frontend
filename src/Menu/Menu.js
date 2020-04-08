import React, { useState } from "react";
import "./Menu.css";
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
import { tsNonNullExpression } from "@babel/types";
import { display } from "@material-ui/system";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#FFF5F8" };
  else return { color: "#ffffff" };
};
function SimpleMenu(history, isLoggedIn) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showme, setShowme] = useState(true);
  const [showmecategory, setShowmecategory] = useState(true);
  const [showmechange, setShowmechange] = useState(true);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setShowmecategory(true);
    setShowmechange(true);
    setShowme(false);
    setAnchorEl(null);
  };
  const handleCloseCategory = () => {
    setShowmechange(true);
    setShowme(true);
    setShowmecategory(false);
    setAnchorEl(null);
  };
  const handleCloseChange = () => {
    setShowme(true);
    setShowmecategory(true);
    setShowmechange(false);
    setAnchorEl(null);
  };
  const profilehandler = () => {
    setShowmechange(true);
    setShowme(true);
    setShowmecategory(true);
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
                <span className="Linkdiv">
                  <Link
                    className="nav-link"
                    style={isActive(history, "/profile")}
                    to="/profile"
                    onClick={profilehandler}
                  >
                    Profile
                  </Link>
                </span>
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
                    <MenuItem
                      id="lang"
                      onClick={handleClose}
                      style={showme ? null : { display: "none" }}
                    >
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
                    <MenuItem
                      id="cate"
                      onClick={handleCloseCategory}
                      style={showmecategory ? null : { display: "none" }}
                    >
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
                    <MenuItem
                      id="change"
                      onClick={handleCloseChange}
                      style={showmechange ? null : { display: "none" }}
                    >
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
}
export default withRouter(SimpleMenu);
