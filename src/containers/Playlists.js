import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import PlaylistCard from "../components/PlaylistCard";

const Playlists = ({ playlists, token, handleDelete, handleRefresh }) => {
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
				{...playlist}
			/>
		);
	});
};

Playlists.propTypes = {
	playlists: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleRefresh: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	playlists: state.playlists.playlists,
	token: state.currentUser.user.tokenAccess,
});

const mapDispatchtoProps = {
	handleDelete: deletePlaylist,
	handleRefresh: updatePlaylistItems,
};

export default connect(
	mapStateToProps,
	mapDispatchtoProps
)(Playlists);
