import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import {
	handleTabChange,
	plusPlaylistsUpdateBadge,
	minusPlaylistsUpdateBadge,
} from "../store/actions/ui";
import { setPlaylistId, setVideoId } from "../store/actions/player";
import PlaylistCard from "../components/PlaylistCard";
import MessageHolder from "../components/MessageHolder";

function Playlists({ playlists, token, ...funcs }) {
	const [showDeleteMsg, toggleMsg] = React.useState(false);
	const [deleteId, toggleDeleteId] = React.useState(null);
	const [minusBadge, toggleMinusBadge] = React.useState(false);

	// fires when a user clicks the play button
	const handlePlay = id => () => {
		const { items } = playlists.find(playlist => playlist.id === id);
		// go to player tab and set the playlistId and first videoId in the store
		funcs.handleTabChange(2);
		funcs.setPlaylistId(id);
		funcs.setVideoId(items[0].videoId);
	};

	// fires when the user clicks the delete button
	const handleDeleteDialog = (id, isUpdateAvailable) => {
		toggleDeleteId(id);
		toggleMsg(true);
		toggleMinusBadge(isUpdateAvailable);
	};

	// fires when the user clicks the confirm delete button
	const handleDeleteConfirmation = () => {
		funcs.handleDelete(token, deleteId);
		toggleMsg(false);
		// if the playlist isn't available for an update stop here
		if (!minusBadge) return;
		// if it does have an updateAvailable, remove it from our badge count
		funcs.minusPlaylistsUpdateBadge();
	};

	const dateNow = Date.now();
	return (
		<>
			{playlists.map(({ id, tags, items, title, fetchingItems }) => {
				const dateUpdate = tags.lastDate + 86400000;
				const isUpdateAvailable = dateNow > dateUpdate;
				return (
					<PlaylistCard
						key={id}
						id={id}
						title={title}
						fetchingItems={fetchingItems}
						date={dateUpdate}
						videoCount={items.length}
						firstItem={items[0] || {}}
						isUpdateAvailable={isUpdateAvailable}
						handlePlay={handlePlay(id)}
						handleDelete={id => handleDeleteDialog(id, isUpdateAvailable)}
						handleRefresh={() => funcs.handleRefresh(token, id, tags, title)}
						plusPlaylistsUpdateBadge={funcs.plusPlaylistsUpdateBadge}
					/>
				);
			})}
			{showDeleteMsg && (
				<MessageHolder
					deleteId={deleteId}
					isError={false}
					isOpen={showDeleteMsg}
					handleClose={() => toggleMsg(false)}
					handleNeg={() => toggleMsg(false)}
					handlePos={handleDeleteConfirmation}
					textNeg="Nvm, take me back."
					textPos="Yes, I'm sure."
					title="Are you sure you want to delete this playlist?"
					message="There's no undoing this..."
				/>
			)}
		</>
	);
}

Playlists.propTypes = {
	playlists: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleRefresh: PropTypes.func.isRequired,
	handleTabChange: PropTypes.func.isRequired,
	setPlaylistId: PropTypes.func.isRequired,
	setVideoId: PropTypes.func.isRequired,
	plusPlaylistsUpdateBadge: PropTypes.func.isRequired,
	minusPlaylistsUpdateBadge: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	playlists: state.playlists,
	token: state.currentUser.user.tokenAccess,
});

const mapDispatchtoProps = {
	handleDelete: deletePlaylist,
	handleRefresh: updatePlaylistItems,
	handleTabChange,
	setPlaylistId,
	setVideoId,
	plusPlaylistsUpdateBadge,
	minusPlaylistsUpdateBadge,
};

export default connect(
	mapStateToProps,
	mapDispatchtoProps
)(Playlists);
