import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Player from "../components/Player";
import PlayerInfo from "../components/PlayerInfo";
import PlayerListHeader from "./PlayerListHeader";
import PlayerListItems from "../components/PlayerListItems";
import { deletePlaylistItem } from "../store/actions/playlistItems";
import { setVideoId, setPlaylistId } from "../store/actions/player";
import { handleTabChange } from "../store/actions/ui";
import { handleVideoPlayer } from "../util/helpers";

const styles = theme => ({
  container: { [theme.breakpoints.up("sm")]: { paddingTop: 15 } }
});

const PlayerTab = ({
  classes,
  token,
  title,
  items,
  video,
  autoDelete,
  playlistId,
  ...dispatchers
}) => {
  // these variables are used when the video is finished
  const funcs = dispatchers;
  const values = { token, title, items, autoDelete, playlistId };
  const { playlistItemId, videoId } = video;
  const vidIds = { playlistItemId, videoId };
  return (
    <Grid
      className={classes.container}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid container item xs={12} sm={10} md={6}>
        <Player
          videoId={videoId}
          onFinish={handleVideoPlayer(autoDelete, funcs, values, vidIds)}
        />
        <PlayerInfo {...video} />
      </Grid>
      <Grid item xs={12} sm={10} md={5}>
        <PlayerListHeader playlistTitle={title} />
        <PlayerListItems
          playlistItems={items}
          deleteItem={handleVideoPlayer(true, funcs, values)}
          playItem={dispatchers.setVideoId}
          currentVideoId={videoId}
        />
      </Grid>
    </Grid>
  );
};

PlayerTab.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  video: PropTypes.object.isRequired,
  autoDelete: PropTypes.bool.isRequired,
  playlistId: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  setVideoId: PropTypes.func.isRequired,
  setPlaylistId: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired
};

const mapStateToProps = ({ playlists, player, currentUser }) => {
  const token = currentUser.user.tokenAccess;
  const { title, items } = playlists.find(({ id }) => id === player.playlistId);
  const { playlistId, autoDelete } = player;
  const video = items.find(item => item.videoId === player.currentVideoId);
  return {
    token,
    title,
    items,
    video,
    playlistId,
    autoDelete
  };
};

const mapDispatchToProps = {
  deleteItem: deletePlaylistItem,
  setVideoId,
  setPlaylistId,
  handleTabChange
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PlayerTab);
