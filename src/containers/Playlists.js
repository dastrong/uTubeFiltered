import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { getPlaylistItems } from "../store/actions/playlistItems";
import PlaylistCard from "../components/PlaylistCard";

const Playlists = ({ playlists, ...props }) =>
  playlists.map(({ snippet, id }) => (
    <PlaylistCard
      key={id}
      id={id}
      title={snippet.title}
      thumbnail={snippet.thumbnails.default.url}
      date={Number(snippet.tags[2].slice(11)) + 86400000}
      // date={Date.now() + 2000}
      {...props}
    />
  ));

Playlists.propTypes = {
  playlists: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired
  // handlePlay: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  playlists: state.playlists.playlists,
  token: state.currentUser.user.tokenAccess
});

const mapDispatchtoProps = {
  handleDelete: deletePlaylist,
  handleRefresh: getPlaylistItems
  // - get the id of the targeted playlist
  // - find that playlist in our redux state
  // - set that playlist data as player data for our player component
  // - change the tab to the player tab for viewing
  // handlePlay:
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Playlists);
