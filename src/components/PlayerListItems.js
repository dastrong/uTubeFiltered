import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import PlayerListItem from "./PlayerListItem";
import { plItemPlay } from "../store/actions/ids";

export default function PlayerListItems(props) {
  const { videos, deleteVid, storePatch, curPlItemId, curVidIdx } = props;

  useLayoutEffect(() => {
    document.querySelector("#items-holder").scrollTop = curVidIdx * 100;
  }, [curVidIdx]);

  return (
    <div id="items-holder" style={{ maxHeight: "500px", overflowY: "auto" }}>
      {videos.map(({ videoTitle, thumbnail, playlistItemId }, i) => {
        const isPlaying = playlistItemId === curPlItemId;
        return (
          <PlayerListItem
            key={i + " listItem: " + playlistItemId}
            title={videoTitle}
            thumbnail={thumbnail}
            deleteVid={() => deleteVid(isPlaying, playlistItemId)}
            playVid={() => storePatch(plItemPlay(playlistItemId))}
            isPlaying={isPlaying}
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
  curVidIdx: PropTypes.number.isRequired
};
