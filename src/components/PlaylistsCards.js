import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Zoom, Typography, CircularProgress } from "@material-ui/core";
import PlaylistCard from "../components/PlaylistCard";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import { setTab, decrPlUpdBadge } from "../store/actions/ui";
import { playlistPlay, plItemPlay } from "../store/actions/ids";

const blankThumbnail = "https://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg";

const useStyles = makeStyles({
  h6: {
    margin: "10px auto",
    maxWidth: 150,
    textAlign: "center"
  }
});

export default function PlaylistsCards(props) {
  const {
    storePatch,
    statePatch,
    playlists,
    token,
    arePlLoading,
    sorter
  } = props;
  const classes = useStyles();
  const isPlaylistFound = !!playlists.length;
  const dateNow = Date.now();

  // fires when a user clicks the play button
  const watchPL = useCallback(
    (playlistId, firstItemId) => {
      // go to player tab and set the playlistId and first videoId in the store
      storePatch(setTab(2));
      storePatch(playlistPlay(playlistId));
      storePatch(plItemPlay(firstItemId));
    },
    [storePatch]
  );

  // fires when a user clicks the refresh button
  const refreshPL = useCallback(
    (id, tags, title) => {
      storePatch(updatePlaylistItems(token, id, tags, title));
      storePatch(decrPlUpdBadge());
    },
    [storePatch, token]
  );

  if (arePlLoading) return <CircularProgress />;

  if (!isPlaylistFound) {
    return (
      <Typography className={classes.h6} variant="h6">
        No Playlists Found
      </Typography>
    );
  }

  return playlists.map(({ id, tags, items, title }, i) => {
    const videoCount = items.length;
    const firstItemId = !!videoCount ? items[0].playlistItemId : "";
    const thumbnail = videoCount ? items[0].thumbnail : blankThumbnail;
    return (
      <Zoom
        key={id + sorter + i}
        in={true}
        style={{ transitionDelay: `${i * 150}ms` }}
      >
        <PlaylistCard
          id={id}
          title={title}
          tags={tags}
          dateNow={dateNow}
          thumbnail={thumbnail}
          videoCount={videoCount}
          firstItemId={firstItemId}
          statePatch={statePatch}
          storePatch={storePatch}
          watchPL={watchPL}
          refreshPL={refreshPL}
        />
      </Zoom>
    );
  });
}

PlaylistsCards.propTypes = {
  statePatch: PropTypes.func.isRequired,
  storePatch: PropTypes.func.isRequired,
  playlists: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  sorter: PropTypes.string.isRequired,
  arePlLoading: PropTypes.bool.isRequired
};
