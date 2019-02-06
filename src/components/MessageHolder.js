import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MessageInner from "./MessageInner";

const styles = {
	paper: {
		margin: 20,
		maxWidth: 500,
	},
};

const MessageHolder = ({ classes, handleClose, isOpen, ...innerProps }) => (
	<Dialog
		classes={classes}
		open={isOpen}
		fullWidth
		onClose={() => handleClose()}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<MessageInner {...innerProps} />
	</Dialog>
);

MessageHolder.propTypes = {
	classes: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MessageHolder);
