import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PlayerInfoDescription from "./PlayerInfoDescription";
import { convertDateToString } from "../util/helpers";

const styles = {
  container: {
    padding: 5,
    width: "100%",
    borderBottom: "1px solid rgba(0, 0, 0, 0.22)"
  },
  vidTitle: {
    borderTop: "1px solid rgba(0, 0, 0, 0.22)",
    marginTop: 5,
    paddingTop: 5
  },
  vidTitleTag: {
    color: "inherit",
    textDecoration: "inherit"
  }
};

const PlayerInfo = ({
  classes,
  videoTitle,
  videoDate,
  channelId,
  channelName,
  description,
  viewsCount
}) => {
  const date = convertDateToString(videoDate);
  return (
    <Grid item className={classes.container}>
      <Typography variant="subtitle1">{videoTitle}</Typography>
      <Typography variant="caption">
        {Number(viewsCount).toLocaleString()} views
      </Typography>
      <Typography className={classes.vidTitle} variant="body2">
        <a
          className={classes.vidTitleTag}
          href={`https://www.youtube.com/channel/${channelId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {channelName}
        </a>
      </Typography>
      <Typography variant="caption">Published on: {date}</Typography>
      <PlayerInfoDescription description={description} />
    </Grid>
  );
};

PlayerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  videoTitle: PropTypes.string.isRequired,
  videoDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayerInfo);
