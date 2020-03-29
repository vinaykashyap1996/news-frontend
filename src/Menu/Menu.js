import React from "react";
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
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#FFF5F8" };
  else return { color: "#ffffff" };
};
function SimpleMenu(history, isLoggedIn) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  console.log(history);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
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
          {!history.isLoggedIn && (
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

          {history.isLoggedIn && (
            <div>
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
                <MenuItem onClick={handleClose}>
                  <>
                    <span className="Linkdiv">
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
                    </span>
                  </>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <>
                    <span>
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
                    </span>
                  </>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(SimpleMenu);
