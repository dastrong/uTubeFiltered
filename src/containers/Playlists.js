import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import { handleTabChange } from "../store/actions/ui";
import { setPlaylistId, setVideoId } from "../store/actions/player";
import PlaylistCard from "../components/PlaylistCard";

class Playlists extends Component {
  handlePlay = id => () => {
    const { items } = this.props.playlists.find(playlist => playlist.id === id);
    // go to player tab and set the playlistId and first videoId in the store
    this.props.handleTabChange(2);
    this.props.setPlaylistId(id);
    this.props.setVideoId(items[0].videoId);
  };

  render() {
    const { playlists, token, handleDelete, handleRefresh } = this.props;
    const dateNow = Date.now();
    return playlists.map(({ tags, id, items, ...rest }) => {
      const dateUpdate = tags.lastDate + 86400000;
      return (
        <PlaylistCard
          key={id}
          date={dateUpdate}
          isUpdateAvailable={dateNow > dateUpdate}
          videoCount={items.length}
          handleRefresh={handleRefresh.bind(this, token, id, tags)}
          handleDelete={handleDelete.bind(this, token, id)}
          handlePlay={this.handlePlay(id)}
          firstItem={items[0] || {}}
          {...rest}
        />
      );
    });
  }
}

Playlists.propTypes = {
  playlists: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  setPlaylistId: PropTypes.func.isRequired,
  setVideoId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  token: state.currentUser.user.tokenAccess
});

const mapDispatchtoProps = {
  handleDelete: deletePlaylist,
  handleRefresh: updatePlaylistItems,
  handleTabChange,
  setPlaylistId,
  setVideoId
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Playlists);
