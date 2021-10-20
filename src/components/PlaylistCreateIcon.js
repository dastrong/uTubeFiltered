import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Zoom, Fab } from "@material-ui/core";
import PlaylistIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles((theme) => ({
  root: {},
  fab: {
    position: "absolute",
    right: 5,
    zIndex: 11,
    [theme.breakpoints.down("xs")]: {
      bottom: 53,
      position: "fixed"
    },
    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%)",

    "&:active": {
      boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%)"
    }
  }
}));

export default function PlaylistCreateIcon({ statePatch }) {
  const classes = useStyles();
  return (
    <Zoom in={true}>
      <Fab
        aria-label="PlaylistAdd"
        color="secondary"
        className={classes.fab}
        onClick={() => statePatch({ type: "Create_Open" })}
      >
        <PlaylistIcon />
      </Fab>
    </Zoom>
  );
}

PlaylistCreateIcon.propTypes = {
  statePatch: PropTypes.func.isRequired
};
