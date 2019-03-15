import React from "react";
import PropTypes from "prop-types";
import PlayerListItem from "./PlayerListItem";

const PlayerListItems = ({
  playlistItems,
  deleteItem,
  currentVideoId,
  playItem
}) => {
  React.useLayoutEffect(() =>
    document.querySelector(".active-item").scrollIntoView()
  );

  return (
    <div
      className="items-holder"
      style={{ maxHeight: "500px", overflowY: "auto" }}
    >
      {playlistItems.map(
        ({ videoId, videoTitle, thumbnail, playlistItemId }) => {
          const isPlaying = videoId === currentVideoId;
          return (
            <PlayerListItem
              key={videoId}
              title={videoTitle}
              thumbnail={thumbnail}
              deleteItem={() =>
                deleteItem({ playlistItemId, videoId }, isPlaying)
              }
              playItem={() => playItem(videoId)}
              isPlaying={isPlaying}
            />
          );
        }
      )}
    </div>
  );
};

PlayerListItems.propTypes = {
  playlistItems: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  currentVideoId: PropTypes.string.isRequired,
  playItem: PropTypes.func.isRequired
};

export default PlayerListItems;
