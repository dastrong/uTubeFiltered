import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import PlaylistCard from "../components/PlaylistCard";
import { handleTabChange, choosingPlaylist } from "../store/actions/ui";

class Playlists extends Component {
  handlePlay = id => () => {
    // go to player tab
    this.props.handleTabChange(2);
    // sets the playlistId in the store
    // which will be used in the player tab
    this.props.choosingPlaylist(id);
  };

  render() {
    const { playlists, token, handleDelete, handleRefresh } = this.props;
    const dateNow = Date.now();
    return playlists.map(playlist => {
      const dateUpdate = playlist.tags.lastDate + 86400000;
      return (
        <PlaylistCard
          key={playlist.id}
          date={dateUpdate}
          isUpdateAvailable={dateNow > dateUpdate}
          handleRefresh={handleRefresh.bind(
            this,
            token,
            playlist.id,
            playlist.tags
          )}
          handleDelete={handleDelete.bind(this, token, playlist.id)}
          handlePlay={this.handlePlay(playlist.id)}
          {...playlist}
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
  choosingPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  token: state.currentUser.user.tokenAccess
});

const mapDispatchtoProps = {
  handleDelete: deletePlaylist,
  handleRefresh: updatePlaylistItems,
  handleTabChange,
  choosingPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Playlists);
