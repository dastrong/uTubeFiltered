import React, { useState, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core/";

const opts = {
  width: "100%",
  playerVars: {
    autoplay: 1,
    iv_load_policy: 3,
    rel: 0
  }
};

const useStyles = makeStyles({
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
});

export default function Player({ videoId, onFinish }) {
  const classes = useStyles();
  const [isPlayerReady, setReady] = useState(false);

  useLayoutEffect(() => {
    document.querySelector("#video-player").scrollIntoView();
  }, [videoId]);

  return (
    <Grid id="video-player" item className={classes.compContainer}>
      <YouTube
        containerClassName={`${classes.iFrameContainer} ${
          isPlayerReady ? classes.iFrameIsLoaded : ""
        }`}
        videoId={videoId}
        opts={opts}
        onEnd={onFinish}
        onReady={() => setReady(true)}
      />
      {!isPlayerReady && <CircularProgress className={classes.spinner} />}
    </Grid>
  );
}

Player.propTypes = {
  videoId: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired
};
