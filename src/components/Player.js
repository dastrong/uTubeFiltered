import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const opts = {
  width: "100%",
  playerVars: {
    autoplay: 1,
    iv_load_policy: 3,
    rel: 0
  }
};

const styles = {
  compContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxShadow: "inset 0px 0px 3px 0.5px rgba(101, 98, 98, 0.91)"
  },
  iFrameContainer: {
    width: "100%",
    height: 360,
    transition: "opacity 0.45s",
    opacity: 0
  },
  iFrameIsLoaded: {
    opacity: 1
  },
  spinner: {
    position: "absolute"
  }
};

const Player = ({
  classes,
  videoId,
  onFinish,
  isPlayerReady,
  togglePlayerReady
}) => (
  <Grid item className={classes.compContainer}>
    <YouTube
      containerClassName={`${classes.iFrameContainer} ${
        isPlayerReady ? classes.iFrameIsLoaded : ""
      }`}
      videoId={videoId}
      opts={opts}
      onEnd={onFinish}
      onReady={togglePlayerReady}
    />
    {!isPlayerReady && <CircularProgress className={classes.spinner} />}
  </Grid>
);

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  videoId: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  togglePlayerReady: PropTypes.func.isRequired,
  isPlayerReady: PropTypes.bool.isRequired
};

export default withStyles(styles)(Player);