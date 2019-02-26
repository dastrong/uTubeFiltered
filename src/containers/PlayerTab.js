import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Player from "../components/Player";
import PlaylistItemList from "../components/PlaylistItemList";

class PlayerTab extends Component {
  state = {
    playlistId: this.props.activePlaylist.id,
    playlistTitle: this.props.activePlaylist.title,
    playlistItems: this.props.activePlaylist.items,
    isLoading: false,
    autoDelete: true
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Player />
        <PlaylistItemList />
      </Grid>
    );
  }
}

PlayerTab.propTypes = {
  activePlaylist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activePlaylist: state.playlists.find(
    playlist => playlist.id === state.ui.playlists.activePlaylistId
  )
});

export default connect(
  mapStateToProps,
  null
)(PlayerTab);
