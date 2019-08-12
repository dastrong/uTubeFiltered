import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import PlayerListItem from "./PlayerListItem";
import { setVideoId } from "../store/actions/player";

export default function PlayerListItems(props) {
  const { videos, deleteVid, storePatch, curVidId, curVidIdx } = props;

  useLayoutEffect(() => {
    document.querySelector("#items-holder").scrollTop = curVidIdx * 100;
  }, [curVidIdx]);

  return (
    <div id="items-holder" style={{ maxHeight: "500px", overflowY: "auto" }}>
      {videos.map(({ videoId, videoTitle, thumbnail, playlistItemId }, i) => {
        const isPlaying = videoId === curVidId;
        return (
          <PlayerListItem
            key={i + " listItem: " + videoId}
            title={videoTitle}
            thumbnail={thumbnail}
            deleteVid={() => deleteVid(isPlaying, playlistItemId)}
            playVid={() => storePatch(setVideoId(videoId))}
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
  curVidId: PropTypes.string.isRequired,
  curVidIdx: PropTypes.number.isRequired
};
