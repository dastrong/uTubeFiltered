import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import PlayerListItem from "./PlayerListItem";

export default function PlayerListItems(props) {
  const {
    videos,
    deleteVid,
    storePatch,
    curPlItemId,
    curVidIdx,
    deletingId
  } = props;

  useLayoutEffect(() => {
    document.querySelector("#items-holder").scrollTop = curVidIdx * 100;
  }, [curVidIdx]);

  return (
    <div id="items-holder" style={{ maxHeight: "500px", overflowY: "auto" }}>
      {videos.map(({ videoTitle, thumbnail, playlistItemId }) => {
        const isPlaying = playlistItemId === curPlItemId;
        const isDeleting = playlistItemId === deletingId;
        return (
          <PlayerListItem
            key={"listItem: " + playlistItemId}
            title={videoTitle}
            thumbnail={thumbnail}
            deleteVid={deleteVid}
            storePatch={storePatch}
            isPlaying={isPlaying}
            isDeleting={isDeleting}
            playlistItemId={playlistItemId}
          />
        );
      })}
    </div>
  );
}

PlayerListItems.propTypes = {
  videos: PropTypes.array.isRequired,
  deleteVid: PropTypes.func.isRequired,
  storePatch: PropTypes.func.isRequired,
  curPlItemId: PropTypes.string.isRequired,
  curVidIdx: PropTypes.number.isRequired,
  deletingId: PropTypes.string.isRequired
};
