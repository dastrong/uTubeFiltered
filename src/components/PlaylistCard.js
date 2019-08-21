import React, { useState } from "react";
import PropTypes from "prop-types";
import Countdown, { zeroPad } from "react-countdown-now";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  IconButton,
  Badge
} from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import NotInterested from "@material-ui/icons/NotInterestedRounded";
import ToolTip from "./ToolTip";
import IconWithSpin from "./IconWithSpin";

const useStyles = makeStyles(theme => ({
  item: {
    minWidth: 300,
    maxWidth: 450,
    [theme.breakpoints.up("sm")]: {
      minWidth: 375
    }
  },
  card: {
    boxShadow: "0 0 8px #3f51b5",
    margin: 5,
    [theme.breakpoints.up("sm")]: {
      margin: 10
    }
  },
  details: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  content: {
    flex: "1 0 auto",
    textAlign: "center"
  },
  date: {
    padding: "0 0 5px!important",
    textAlign: "center"
  },
  info: { width: "100%" },
  cover: {
    width: 120,
    height: "auto"
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  playIcon: {
    height: 40,
    width: 40
  },
  otherIcons: {
    height: 22,
    width: 22
  },
  badge: {
    right: 0,
    top: 0,
    transform: "translate(0, 0)",
    borderRadius: "0 0 0 100%",
    width: 30,
    height: 30,
    padding: "0 0 5px 5px",
    fontSize: "0.9rem"
  },
  extraRefreshPad: {
    padding: "9px 0"
  }
}));

// used to show the countdown time or text if complete
const CountdownText = ({ hours, minutes, seconds, completed }) => `
		Update
		${
      completed
        ? " now!"
        : ` in ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
    }
`;

export default function PlaylistCard({
  id,
  title,
  tags,
  dateNow,
  thumbnail,
  videoCount,
  firstItemId,
  isDeleting,
  isUpdating,
  statePatch,
  storePatch,
  watchPL,
  refreshPL,
  ...props
}) {
  const classes = useStyles();
  const dateUpdate = tags && tags.lastUpdate + 86400000;
  const isUpdateAvail = tags && dateNow > dateUpdate;
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(isUpdateAvail);

  const setUpdateAvailable = () => setIsUpdateAvailable(true);

  return (
    <Grid {...props} className={classes.item} item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
        <div className={classes.details}>
          <div className={classes.info}>
            <div className={classes.controls}>
              <ToolTip
                title={
                  tags === null
                    ? "Refer to FAQ for more info"
                    : isUpdateAvailable
                    ? ""
                    : "Do some work then come back"
                }
                className={classes.extraRefreshPad}
              >
                <IconButton
                  aria-label="Refresh"
                  disabled={!isUpdateAvailable}
                  onClick={() => refreshPL(id, tags, title)}
                >
                  {tags === null ? (
                    <NotInterested
                      color="error"
                      className={classes.otherIcons}
                    />
                  ) : (
                    <IconWithSpin spin={isUpdating}>
                      <RefreshIcon className={classes.otherIcons} />
                    </IconWithSpin>
                  )}
                </IconButton>
              </ToolTip>
              <ToolTip title={videoCount ? "" : "No videos found in here"}>
                <IconButton
                  aria-label="Play"
                  disabled={!videoCount}
                  onClick={() => watchPL(id, firstItemId)}
                >
                  <PlayIcon className={classes.playIcon} />
                </IconButton>
              </ToolTip>
              <IconButton
                aria-label="Delete"
                onClick={() =>
                  statePatch({
                    type: "Delete_Open",
                    deleteId: id,
                    shouldBadgeUpdate: isUpdateAvailable
                  })
                }
              >
                <IconWithSpin spin={isDeleting}>
                  <DeleteIcon className={classes.otherIcons} />
                </IconWithSpin>
              </IconButton>
            </div>
            <CardContent className={classes.date}>
              <Typography variant="caption">
                {isUpdateAvailable !== null ? (
                  <Countdown
                    date={dateUpdate}
                    zeroPadTime={0}
                    renderer={CountdownText}
                    onComplete={setUpdateAvailable}
                  />
                ) : (
                  "Not a uTubeFiltered playlist"
                )}
              </Typography>
            </CardContent>
          </div>
          <Badge
            classes={{ badge: classes.badge }}
            badgeContent={videoCount}
            color="secondary"
            invisible={!videoCount}
          >
            <CardMedia
              component="img"
              alt="playlist thumbnail"
              className={classes.cover}
              title={title}
              image={thumbnail}
            />
          </Badge>
        </div>
      </Card>
    </Grid>
  );
}

PlaylistCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // tags can be null or an object
  dateNow: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  videoCount: PropTypes.number.isRequired,
  firstItemId: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  statePatch: PropTypes.func.isRequired,
  storePatch: PropTypes.func.isRequired,
  watchPL: PropTypes.func.isRequired,
  refreshPL: PropTypes.func.isRequired
};
