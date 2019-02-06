import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import PlaylistForm from "../components/PlaylistForm";
import MessageHolder from "../components/MessageHolder";
import { CircularProgress } from "@material-ui/core";
import { description } from "../util/helpers";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
	createPlaylist,
	loadingPlaylists,
	handleMessage,
} from "../store/actions/playlists";

const styles = {
	flex: {
		flex: 1,
	},
	content: {
		padding: "24px 16px 8px",
	},
	text: {
		fontStyle: "italic",
		textAlign: "center",
	},
	actions: {
		margin: 0,
		padding: "0 16px 16px",
	},
	actBtns: {
		margin: "0 0 0 4px",
	},
	buttonProgress: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -8,
	},
	wrapper: {
		margin: "0 0 0 4px",
		position: "relative",
	},
};

class DialogInner extends Component {
	state = {
		channels: [],
		query: "",
		title: "",
	};

	handleSelect = value => this.setState({ channels: value });

	handleInputs = name => e => this.setState({ [name]: e.target.value });

	handleSubmit = () => {
		const { title, query, channels } = this.state;
		const { token, createPlaylist, loadingPlaylists } = this.props;
		loadingPlaylists();
		const channelIds = channels.map(item => item.value);
		const tagChannels = channelIds.reduce(
			(acc, cVal, i, arr) =>
				acc.concat(`${cVal}${arr.length - 1 !== i ? "&" : ""}`),
			"channel:"
		);
		const tagQuery = `query:${query}`;
		const lastUpdate = `lastUpdate:${new Date().toISOString()}`;
		const tags = [tagChannels, tagQuery, lastUpdate];
		createPlaylist(token, { title, description, tags });
	};

	closeBothDialogs = () => {
		// dispatch to our redux state
		this.props.handleMessage();
		// from our DialogHolder component
		this.props.handleClose();
	};

	resetForm = () =>
		this.setState(
			{
				title: "",
				query: "",
				channels: [],
			},
			this.props.handleMessage
		);

	render() {
		const {
			classes,
			handleClose,
			token,
			isLoading,
			isError,
			message,
			handleMessage,
		} = this.props;
		return (
			<>
				<AppBar color="secondary" position="relative">
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.flex}>
							Create a Playlist
						</Typography>
						<IconButton
							color="inherit"
							onClick={handleClose}
							aria-label="Close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<DialogContent className={classes.content}>
					<DialogContentText className={classes.text}>
						Please fill in all fields.
					</DialogContentText>
					<PlaylistForm
						{...this.state}
						token={token}
						handleClose={this.handleClose}
						handleSelect={this.handleSelect}
						handleInputs={this.handleInputs}
						handleSubmit={this.handleSubmit}
					/>
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
							onClick={this.handleSubmit}
							className={classes.actBtns}
							disabled={
								isLoading
								// isLoading ||
								// !channels.length ||
								// query.length < 4 ||
								// title.length < 4 ||
								// query.length > 30 ||
								// title.length > 15
							}
						>
							Create
						</Button>
						{isLoading && (
							<CircularProgress size={24} className={classes.buttonProgress} />
						)}
					</div>
				</DialogActions>
				<MessageHolder
					isError={isError}
					isOpen={!!message}
					handleClose={handleMessage}
					message={message}
					handleNeg={this.closeBothDialogs}
					handlePos={this.resetForm}
					textNeg={isError ? "Go back." : "No, thanks."}
					textPos={isError ? "Try again?" : "Yes, please. "}
				/>
			</>
		);
	}
}

DialogInner.propTypes = {
	classes: PropTypes.object.isRequired,
	token: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleMessage: PropTypes.func.isRequired,
	createPlaylist: PropTypes.func.isRequired,
	loadingPlaylists: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	token: state.currentUser.user.tokenAccess,
	isLoading: state.playlists.isLoading,
	isError: state.playlists.isError,
	message: state.playlists.message,
});

const mapDispatchToProps = {
	createPlaylist,
	loadingPlaylists,
	handleMessage,
};

export default compose(
	withStyles(styles),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(DialogInner);
