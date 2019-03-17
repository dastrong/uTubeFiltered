import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePlaylist } from "../store/actions/playlists";
import { updatePlaylistItems } from "../store/actions/playlistItems";
import { handleTabChange } from "../store/actions/ui";
import { setPlaylistId, setVideoId } from "../store/actions/player";
import PlaylistCard from "../components/PlaylistCard";
import MessageHolder from "../components/MessageHolder";

function Playlists({
	playlists,
	token,
	handleDelete,
	handleRefresh,
	handleTabChange,
	setPlaylistId,
	setVideoId,
}) {
	const [showDeleteMsg, toggleMsg] = React.useState(false);
	const [deleteId, toggleDeleteId] = React.useState(null);

	const handlePlay = id => () => {
		const { items } = playlists.find(playlist => playlist.id === id);
		// go to player tab and set the playlistId and first videoId in the store
		handleTabChange(2);
		setPlaylistId(id);
		setVideoId(items[0].videoId);
	};

	const dateNow = Date.now();
	return (
		<>
			{playlists.map(({ tags, id, items, ...rest }) => {
				const dateUpdate = tags.lastDate + 86400000;
				return (
					<PlaylistCard
						key={id}
						id={id}
						date={dateUpdate}
						isUpdateAvailable={dateNow > dateUpdate}
						videoCount={items.length}
						handleRefresh={handleRefresh.bind(this, token, id, tags)}
						handleDelete={id => {
							toggleDeleteId(id);
							toggleMsg(true);
						}}
						handlePlay={handlePlay(id)}
						firstItem={items[0] || {}}
						{...rest}
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
					handlePos={() => {
						handleDelete(token, deleteId);
						toggleMsg(false);
					}}
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
};

export default connect(
	mapStateToProps,
	mapDispatchtoProps
)(Playlists);
