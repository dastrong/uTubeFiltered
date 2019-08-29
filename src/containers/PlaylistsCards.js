import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, shallowEqual } from "react-redux";
import { createSelector } from "reselect";
import { Typography, CircularProgress, useMediaQuery } from "@material-ui/core";
import PlaylistCard from "../components/PlaylistCard";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import { setTab, decrPlUpdBadge } from "../store/actions/ui";
import { playlistPlay, plItemPlay } from "../store/actions/ids";
import useSort from "../hooks/useSort";

const blankThumbnail = "https://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg";

const NoPlaylistsFound = () => (
  <Typography style={{ margin: "10px auto" }} variant="h6">
    No Playlists Found
  </Typography>
);

const playlistSelector = state => state.playlists;
const loaderSelector = state => state.ui.arePlLoading;
const plUpdatesSelector = state => state.plUpdates;
const idsSelector = state => state.ids.playlist;

const getState = createSelector(
  playlistSelector,
  loaderSelector,
  plUpdatesSelector,
  idsSelector,
  (playlists, arePlLoading, plUpdates, { deleting, updating }) => ({
    playlists,
    arePlLoading,
    ...plUpdates,
    deleting,
    updating
  })
);

export default function PlaylistsCards(props) {
  const { storePatch, statePatch, token, sortBy, order } = props;

  const {
    playlists,
    arePlLoading,
    deleting,
    updating,
    newVideoCount,
    videosAdded
  } = useSelector(getState, shallowEqual);
  const sortedPlaylists = useSort(playlists, sortBy, order);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isSmall = useMediaQuery("(max-width: 769px)");
  const isLarge = useMediaQuery("(min-width: 1145px)");
  const cardsPerLine = isSmall ? 1 : isLarge ? 3 : 2;

  const isPlaylistFound = !!sortedPlaylists.length;
  const dateNow = Date.now();
  const getProgress = newVideoCount < 5;
  const updateProgress = getProgress ? 0 : (videosAdded / newVideoCount) * 100;

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

  if (!isPlaylistFound) return <NoPlaylistsFound />;

  return sortedPlaylists.map(({ id, tags, items, title }, i) => {
    const videoCount = items.length;
    const firstItemId = !!videoCount ? items[0].playlistItemId : "";
    const thumbnail = videoCount ? items[0].thumbnail : blankThumbnail;
    const isDeleting = deleting === id;
    const isUpdating = updating === id;
    return (
      <PlaylistCard
        key={id + sortBy + order + i}
        id={id}
        title={title}
        tags={tags}
        dateNow={dateNow}
        thumbnail={thumbnail}
        videoCount={videoCount}
        firstItemId={firstItemId}
        isDeleting={isDeleting}
        isUpdating={isUpdating}
        updateProgress={updateProgress}
        statePatch={statePatch}
        storePatch={storePatch}
        watchPL={watchPL}
        refreshPL={refreshPL}
        index={i}
        cardsPerLine={cardsPerLine}
        isMobile={!!isMobile}
      />
    );
  });
}

PlaylistsCards.propTypes = {
  statePatch: PropTypes.func.isRequired,
  storePatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};
