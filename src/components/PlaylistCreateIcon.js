import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Zoom, Fab } from "@material-ui/core";
import PlaylistIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles({
  fab: {
    position: "absolute",
    right: 5
  }
});

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
