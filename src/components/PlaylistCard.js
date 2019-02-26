import React, { Component } from "react";
import PropTypes from "prop-types";
import Countdown, { zeroPad } from "react-countdown-now";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import PlayIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import { CircularProgress } from "@material-ui/core";

const styles = {
  card: {
    boxShadow: "0 0 8px #3f51b5",
    margin: "10px 0"
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
  info: {
    width: "100%"
  },
  cover: {
    width: 151,
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
  updating: {
    position: "absolute"
  }
};

// used to show the countdown time or text if complete
const CountdownText = ({ hours, minutes, seconds, completed }) => (
  <Typography variant="caption">
    Update
    {completed
      ? " now!"
      : ` in ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`}
  </Typography>
);

class PlaylistCard extends Component {
  state = {
    isUpdateAvailable: this.props.isUpdateAvailable
  };

  // triggered when a timer hits zero
  handleTimerCompletion = () => this.setState({ isUpdateAvailable: true });

  // stops rerendering every cards during
  // refreshing one cards playlistItems
  shouldComponentUpdate(nextProps) {
    return (
      this.props.fetchingItems !== nextProps.fetchingItems ||
      this.props.thumbnail !== nextProps.thumbnail
    );
  }

  render() {
    const {
      classes,
      title,
      thumbnail,
      date,
      fetchingItems,
      handleRefresh,
      handleDelete,
      handlePlay
    } = this.props;
    return (
      <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography variant="h5">{title}</Typography>
          </CardContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <div className={classes.controls}>
                <IconButton
                  aria-label="Refresh"
                  disabled={!this.state.isUpdateAvailable}
                  onClick={handleRefresh}
                >
                  <RefreshIcon className={classes.otherIcons} />
                  {fetchingItems && (
                    <CircularProgress className={classes.updating} />
                  )}
                </IconButton>
                <IconButton aria-label="Play" onClick={handlePlay}>
                  <PlayIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="Delete" onClick={handleDelete}>
                  <DeleteIcon className={classes.otherIcons} />
                </IconButton>
              </div>
              <CardContent className={classes.date}>
                <Countdown
                  date={date}
                  zeroPadTime={0}
                  renderer={CountdownText}
                  onComplete={this.handleTimerCompletion}
                />
              </CardContent>
            </div>
            <CardMedia
              component="img"
              alt="playlist thumbnail"
              className={classes.cover}
              image={thumbnail}
              title={title}
            />
          </div>
        </Card>
      </Grid>
    );
  }
}

PlaylistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  fetchingItems: PropTypes.bool.isRequired,
  isUpdateAvailable: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default withStyles(styles)(PlaylistCard);
