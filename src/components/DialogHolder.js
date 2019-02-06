import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import PlaylistIcon from "@material-ui/icons/PlaylistAdd";
import Slide from "@material-ui/core/Slide";
import compose from "recompose/compose";
import DialogInner from "../containers/DialogInner";

const styles = {
	root: {
		padding: "0!important",
	},
	paper: {
		width: "100%",
	},
	fab: {
		position: "absolute",
		right: 5,
	},
};

const Transition = props => <Slide direction="up" {...props} />;

class DialogHolder extends Component {
	state = { open: false };

	handleClickOpen = () => this.setState({ open: true });

	handleClose = () => this.setState({ open: false });

	render() {
		const { fullScreen, classes } = this.props;
		return (
			<>
				<Fab
					color="primary"
					aria-label="PlaylistAdd"
					className={classes.fab}
					onClick={this.handleClickOpen}
				>
					<PlaylistIcon />
				</Fab>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					classes={{ paper: classes.paper, root: classes.root }}
				>
					<DialogInner handleClose={this.handleClose} />
				</Dialog>
			</>
		);
	}
}

DialogHolder.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
	withMobileDialog({ breakpoint: "xs" })
)(DialogHolder);
