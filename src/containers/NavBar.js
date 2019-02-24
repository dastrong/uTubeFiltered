import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
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

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    padding: 2,
    margin: 10
  }
};

class NavBar extends Component {
  state = {
    anchorEl: null
  };

  handleMenuOpen = e => this.setState({ anchorEl: e.currentTarget });

  handleMenuClose = () => this.setState({ anchorEl: null });

  render() {
    const { classes, user, isAuthenticated } = this.props;
    const { anchorEl } = this.state;
    const showMenu = Boolean(anchorEl);

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
                  onClick={this.handleMenuOpen}
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
                  onClose={this.handleMenuClose}
                >
                  <MenuItem onClick={() => this.props.unAuthUser(gapiSignOut)}>
                    Sign Out
                  </MenuItem>
                  <MenuItem onClick={() => this.props.unAuthUser(gapiRevoke)}>
                    Revoke Access
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={() => this.props.authUser(gapiSignIn)}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  unAuthUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.currentUser.isAuthenticated,
  user: state.currentUser.user
});

const mapDispatchToProps = {
  authUser,
  unAuthUser
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavBar);
