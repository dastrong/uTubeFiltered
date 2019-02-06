import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// modal used to show error/success messages
const MessageInner = ({
	handleNeg,
	handlePos,
	message,
	isError,
	textNeg,
	textPos,
}) => (
	<>
		<DialogTitle id="alert-dialog-title">
			{isError
				? "Sorry, something went wrong"
				: "Success, everything went right"}
		</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{message}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button size="large" onClick={() => handleNeg()} color="primary">
				{textNeg}
			</Button>
			<Button
				size="large"
				onClick={() => handlePos()}
				color="secondary"
				variant="outlined"
				autoFocus
			>
				{textPos}
			</Button>
		</DialogActions>
	</>
);

MessageInner.propTypes = {
	handleNeg: PropTypes.func.isRequired,
	handlePos: PropTypes.func.isRequired,
	textNeg: PropTypes.string.isRequired,
	textPos: PropTypes.string.isRequired,
};

export default MessageInner;
