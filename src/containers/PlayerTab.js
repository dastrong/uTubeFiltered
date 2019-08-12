import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Player from "../components/Player";
import PlayerInfo from "../components/PlayerInfo";
import PlayerListHeader from "./PlayerListHeader";
import PlayerListItems from "../components/PlayerListItems";
import { deletePlaylistItem } from "../store/actions/playlistItems";
import { setVideoId, setPlaylistId } from "../store/actions/player";
import { handleTabChange } from "../store/actions/ui";

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up("sm")]: {
      paddingTop: 15
    }
  }
}));

const tokenSelector = state => state.currentUser.user.tokenAccess;
const playerSelector = state => state.player;
const playlistSelector = state => state.playlists;

const optionsSelector = createSelector(
  playlistSelector,
  playerSelector,
  (playlists, { playlistId, currentVideoId, autoDelete }) => {
    const { title, items } = playlists.find(({ id }) => id === playlistId);
    const curVidIdx = items.findIndex(item => item.videoId === currentVideoId);
    const video = items[curVidIdx];
    return { title, items, playlistId, autoDelete, curVidIdx, video };
  }
);

const getState = createSelector(
  tokenSelector,
  optionsSelector,
  (token, options) => ({ token, ...options })
);

export default function PlayerTab() {
  const classes = useStyles();
  const storePatch = useDispatch();
  const state = useSelector(getState);
  const {
    token,
    title,
    items,
    playlistId,
    autoDelete,
    curVidIdx,
    video
  } = state;
  const { playlistItemId, videoId } = video;

  function onFinish() {
    if (autoDelete) {
      deleteVideo(true, playlistItemId);
    }
    playNextVideo();
  }

  function deleteVideo(isPlaying, playlistItemId) {
    // dispatch our action to delete the playlist item above
    storePatch(deletePlaylistItem(token, playlistItemId, playlistId));
    // go back to playlists tab and reset the player ids
    if (items.length === 1) {
      storePatch(handleTabChange(1));
      storePatch(setVideoId(null));
      storePatch(setPlaylistId(null));
      return;
    }
    if (isPlaying) {
      playNextVideo();
    }
  }

  function playNextVideo() {
    const nextVidId = _getNextVideoId(items, curVidIdx);
    storePatch(setVideoId(nextVidId));
  }

  return (
    <Grid
      className={classes.container}
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid container item xs={12} sm={10} md={6}>
        <Player videoId={videoId} onFinish={onFinish} />
        <PlayerInfo {...video} />
      </Grid>
      <Grid item xs={12} sm={10} md={5}>
        <PlayerListHeader
          playlistTitle={title}
          autoDelete={autoDelete}
          storePatch={storePatch}
        />
        <PlayerListItems
          videos={items}
          deleteVid={deleteVideo}
          storePatch={storePatch}
          curVidId={videoId}
          curVidIdx={curVidIdx}
        />
      </Grid>
    </Grid>
  );
}

function _getNextVideoId(items, curVidIdx) {
  return items.length - 1 === curVidIdx
    ? items[0].videoId
    : items[curVidIdx + 1].videoId;
}
