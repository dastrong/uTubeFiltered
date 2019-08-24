import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Typography,
	IconButton,
	Card,
	CardMedia,
	CardContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import PlayIcon from "@material-ui/icons/PlayArrow";
import IconWithSpin from "./IconWithSpin";

const opa8 = { opacity: 0.8 };

const useStyles = makeStyles({
	item: { padding: 5 },
	card: {
		boxShadow: "0 0 1px",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		opacity: 1,
		transition: "opacity 0.34s",
		"&:hover": opa8,
		"&:hover $playIcon": opa8
	},
	clicker: {
		cursor: "pointer",
		display: "flex",
		padding: 0,
		alignItems: "center",
		position: "relative",
		height: 90,
		width: "100%"
	},
	image: { width: 120, height: "100%", position: "absolute" },
	content: {
		width: "100%",
		padding: "10px 5px 10px 15px!important"
	},
	text: {
		overflow: "hidden",
		maxHeight: 70,
		fontSize: "0.75rem"
	},
	playIcon: {
		width: 120,
		height: 70,
		paddingTop: 10,
		paddingBottom: 10,
		opacity: 0,
		transition: "opacity 0.34s"
	},
	icon: {
		borderRadius: 0,
		width: 60,
		alignSelf: "stretch"
	},
	active: opa8
});

export default function PlayerListItem(props) {
	const { title, thumbnail, isPlaying, deleteVid, playVid, isDeleting } = props;
	const classes = useStyles();
	const active = isPlaying ? classes.active : "";
	const cxPlayIcon = clsx(classes.playIcon, active);

	return (
		<Grid className={classes.item} item xs={12}>
			<Card className={`${classes.card} ${active}`}>
				<CardContent onClick={playVid} className={classes.clicker}>
					<CardMedia
						component="img"
						alt={`${title.slice(0, 4)}... thumbnail`}
						className={classes.image}
						image={thumbnail}
					/>
					<PlayIcon className={cxPlayIcon} color="primary" />
					<CardContent className={classes.content}>
						<Typography className={classes.text} variant="body2">
							{title}
						</Typography>
					</CardContent>
				</CardContent>

				<IconButton
					className={classes.icon}
					aria-label="Delete"
					onClick={deleteVid}
				>
					<IconWithSpin spin={isDeleting}>
						<DeleteIcon />
					</IconWithSpin>
				</IconButton>
			</Card>
		</Grid>
	);
}

PlayerListItem.propTypes = {
	title: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	deleteVid: PropTypes.func.isRequired,
	playVid: PropTypes.func.isRequired,
	isDeleting: PropTypes.bool.isRequired
};
