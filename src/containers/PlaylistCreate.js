import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	DialogContent,
	DialogActions,
	DialogContentText
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PlaylistForm from "../components/PlaylistForm";
import { description, formTagParams } from "../util/helpers";
import { createPlaylist } from "../store/actions/playlists";

const useStyles = makeStyles({
	flex: {
		flex: 1
	},
	content: {
		padding: "24px 16px 8px"
	},
	text: {
		fontStyle: "italic",
		marginBottom: 0
	},
	actions: {
		margin: 0,
		padding: "0 16px 16px"
	},
	actBtns: {
		margin: "0 0 0 4px"
	},
	buttonProgress: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -8
	},
	wrapper: {
		margin: "0 0 0 4px",
		position: "relative"
	}
});

const initialState = { channels: [], query: "", title: "" };

const reducer = (state, action) => {
	const { type, channels, query, title } = action;
	if (type === "Channels") return { ...state, channels };
	if (type === "Query") return { ...state, query };
	if (type === "Title") return { ...state, title };
	return state;
};

export default function PlaylistCreate({ handleClose }) {
	const classes = useStyles();
	const storePatch = useDispatch();
	const token = useSelector(state => state.currentUser.user.tokenAccess);
	const [state, formPatch] = useReducer(reducer, initialState);
	const { channels, query, title } = state;

	function handleSubmit() {
		const channelIds = channels.map(item => item.value);
		const tags = formTagParams(channelIds, query);
		storePatch(createPlaylist(token, { title, description, tags }));
		handleClose();
	}

	return (
		<>
			<AppBar color="secondary" position="relative">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.flex}>
						Create a Playlist
					</Typography>
					<IconButton color="inherit" onClick={handleClose} aria-label="Close">
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.content}>
				<DialogContentText className={classes.text} align="center">
					Please fill in all fields.
				</DialogContentText>
				<PlaylistForm {...state} token={token} formPatch={formPatch} />
			</DialogContent>
			<DialogActions className={classes.actions}>
				<Button
					size="large"
					color="primary"
					onClick={handleClose}
					className={classes.actBtns}
				>
					Cancel
				</Button>
				<div className={classes.wrapper}>
					<Button
						autoFocus
						size="large"
						color="secondary"
						variant="outlined"
						onClick={handleSubmit}
						className={classes.actBtns}
						disabled={
							channels.length === 0 ||
							query.length < 3 ||
							title.length < 3 ||
							query.length > 20 ||
							title.length > 15
						}
					>
						Create
					</Button>
				</div>
			</DialogActions>
		</>
	);
}

PlaylistCreate.propTypes = {
	handleClose: PropTypes.func.isRequired
};
