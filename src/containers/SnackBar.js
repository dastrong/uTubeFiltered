import React, { useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
	Snackbar,
	SnackbarContent,
	IconButton,
	useTheme,
	useMediaQuery
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { closeSnackBar } from "../store/actions/snacks";

const variantIcon = {
	success: CheckCircleIcon,
	error: ErrorIcon,
	info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down("xs")]: {
			top: 4
		}
	}
}));

export default function SnackBar() {
	const classes = useStyles1();
	const dispatch = useDispatch();
	const { status, message } = useSelector(state => state.snacks, shallowEqual);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	const handleClose = useCallback(
		(e, reason) => {
			if (reason === "clickaway") return;
			dispatch(closeSnackBar);
		},
		[dispatch]
	);

	return (
		<Snackbar
			anchorOrigin={{
				vertical: isMobile ? "top" : "bottom",
				horizontal: "center"
			}}
			open={!!message}
			autoHideDuration={6000}
			onClose={handleClose}
			className={classes.root}
		>
			<SnackBarInner onClose={handleClose} variant={status} message={message} />
		</Snackbar>
	);
}

const useStyles2 = makeStyles(theme => ({
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	},
	info: {
		backgroundColor: theme.palette.primary.main
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1)
	},
	message: {
		display: "flex",
		alignItems: "center"
	}
}));

function SnackBarInner({ message, onClose, variant, ...other }) {
	const classes = useStyles2();
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classes[variant]}
			aria-describedby="snackbar"
			message={
				<span id="snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>
			]}
			{...other}
		/>
	);
}

SnackBarInner.propTypes = {
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["error", "info", "success"]).isRequired
};
