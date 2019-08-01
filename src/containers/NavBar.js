import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Avatar
} from "@material-ui/core";
import { authUser, unAuthUser } from "../store/actions/auth";
import { gapiSignIn, gapiSignOut, gapiRevoke } from "../util/gabi";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  grow: { flexGrow: 1 },
  icon: {
    padding: 2,
    margin: 10
  }
});

const getUser = createSelector(
  state => state.currentUser,
  currentUser => ({ ...currentUser })
);

export default function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(getUser, shallowEqual);

  const [anchorEl, setAnchorEl] = useState(null);
  const showMenu = !!anchorEl;

  const _handleOpen = e => setAnchorEl(e.currentTarget);
  const _handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            uTubeFiltered
          </Typography>
          {isAuthenticated ? (
            <div>
              <IconButton
                className={classes.icon}
                aria-owns={showMenu ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={_handleOpen}
                color="inherit"
              >
                <Avatar src={user.image} alt="user" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={showMenu}
                onClose={_handleClose}
              >
                <MenuItem onClick={() => dispatch(unAuthUser(gapiSignOut))}>
                  Sign Out
                </MenuItem>
                <MenuItem onClick={() => dispatch(unAuthUser(gapiRevoke))}>
                  Revoke Access
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              color="inherit"
              onClick={() => dispatch(authUser(gapiSignIn))}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
