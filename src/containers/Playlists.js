import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { deletePlaylist } from "../store/actions/playlists";
import { getPlaylistItems } from "../store/actions/playlistItems";
import PlaylistCard from "../components/PlaylistCard";
import DialogHolder from "../components/DialogHolder";

const styles = {
	container: {
		padding: 10,
	},
};

// disable the refresh button if the playlist
// has been updated within the last day
const Playlists = ({ classes, playlists, ...props }) => (
	<Grid className={classes.container} container spacing={8}>
		{!playlists.length ? (
			<p>No playlists found</p>
		) : (
			playlists.map(({ snippet, id }) => (
				<PlaylistCard
					key={id}
					id={id}
					title={snippet.title}
					thumbnail={snippet.thumbnails.default.url}
					date={snippet.tags[2].slice(11)}
					{...props}
				/>
			))
		)}
		<DialogHolder />
	</Grid>
);

Playlists.propTypes = {
	classes: PropTypes.object.isRequired,
	playlists: PropTypes.array.isRequired,
	token: PropTypes.string.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleRefresh: PropTypes.func.isRequired,
	// handlePlay: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	playlists: state.playlists.playlists,
	token: state.currentUser.user.tokenAccess,
});

const mapDispatchtoProps = {
	handleDelete: deletePlaylist,
	handleRefresh: getPlaylistItems,
	// - get the id of the targeted playlist
	// - find that playlist in our redux state
	// - set that playlist data as player data for our player component
	// - change the tab to the player tab for viewing
	// handlePlay:
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchtoProps
	)
)(Playlists);
