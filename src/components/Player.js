import React, { useState, useLayoutEffect } from "react";
import clsx from "clsx";
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

const useStyles = makeStyles(theme => ({
  compContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    boxShadow: "inset 0px 0px 3px 0.5px rgba(101, 98, 98, 0.91)",
    backgroundColor: "white",
    zIndex: 111,
    [theme.breakpoints.down("xs")]: {
      marginTop: -10,
      position: "sticky",
      top: 0
    }
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
}));

export default function Player({ videoId, onFinish }) {
  const classes = useStyles();
  const { compContainer, iFrameContainer, iFrameIsLoaded, spinner } = classes;
  const [isPlayerReady, setReady] = useState(false);
  const cx = clsx(iFrameContainer, { [iFrameIsLoaded]: isPlayerReady });

  useLayoutEffect(() => {
    document.querySelector("#video-player").scrollIntoView();
  }, [videoId]);

  return (
    <Grid id="video-player" item className={compContainer}>
      <YouTube
        containerClassName={cx}
        videoId={videoId}
        opts={opts}
        onEnd={onFinish}
        onReady={() => setReady(true)}
      />
      {!isPlayerReady && <CircularProgress className={spinner} />}
    </Grid>
  );
}

Player.propTypes = {
  videoId: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired
};
