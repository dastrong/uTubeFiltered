import React from "react";
import PropTypes from "prop-types";
import Countdown, { zeroPad } from "react-countdown-now";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import PlayIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import NotInterested from "@material-ui/icons/NotInterestedRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToolTip from "./ToolTip";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
	item: {
		minWidth: 300,
		maxWidth: 450,
		[theme.breakpoints.up("sm")]: {
			minWidth: 375,
		},
	},
	card: {
		boxShadow: "0 0 8px #3f51b5",
		margin: 5,
		[theme.breakpoints.up("sm")]: {
			margin: 10,
		},
	},
	details: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
	},
	content: {
		flex: "1 0 auto",
		textAlign: "center",
	},
	date: {
		padding: "0 0 5px!important",
		textAlign: "center",
	},
	info: { width: "100%" },
	cover: {
		width: 120,
		height: "auto",
	},
	controls: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	playIcon: {
		height: 40,
		width: 40,
	},
	otherIcons: {
		height: 22,
		width: 22,
	},
	updating: { position: "absolute" },
	badge: {
		right: 0,
		top: 0,
		borderRadius: "0 0 0 100%",
		width: 30,
		height: 30,
		padding: "0 0 5px 5px",
		fontSize: "0.9rem",
	},
	extraRefreshPad: {
		padding: "9px 0",
	},
});

// used to show the countdown time or text if complete
const CountdownText = ({ hours, minutes, seconds, completed }) => `
		Update
		${
			completed
				? " now!"
				: ` in ${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
		}
`;

function PlaylistCard({
	classes,
	title,
	date,
	fetchingItems,
	isUpdateAvailable,
	handleRefresh,
	handleDelete,
	handlePlay,
	videoCount,
	thumbnail,
	id,
	plusPlaylistsUpdateBadge,
}) {
	const [isUpdateAvail, toggler] = React.useState(isUpdateAvailable);

	function toggleAvailability() {
		// update this cards ui
		toggler(true);
		// updates the playlist ui badge count
		plusPlaylistsUpdateBadge();
	}

	return (
		<Grid className={classes.item} item xs={12} sm={6} md={4} lg={3}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography variant="h5">{title}</Typography>
				</CardContent>
				<div className={classes.details}>
					<div className={classes.info}>
						<div className={classes.controls}>
							<ToolTip
								title={
									isUpdateAvailable === null
										? "Refer to FAQ for more info"
										: isUpdateAvail
										? ""
										: "Do some work then come back"
								}
								className={classes.extraRefreshPad}
							>
								<IconButton
									aria-label="Refresh"
									disabled={!isUpdateAvail}
									onClick={isUpdateAvailable !== null ? handleRefresh : null}
								>
									{isUpdateAvailable === null ? (
										<NotInterested
											color="error"
											className={classes.otherIcons}
										/>
									) : (
										<>
											<RefreshIcon className={classes.otherIcons} />
											{fetchingItems && (
												<CircularProgress className={classes.updating} />
											)}
										</>
									)}{" "}
								</IconButton>
							</ToolTip>
							<ToolTip title={videoCount ? "" : "No videos found in here"}>
								<IconButton
									aria-label="Play"
									disabled={!videoCount}
									onClick={handlePlay}
								>
									<PlayIcon className={classes.playIcon} />
								</IconButton>
							</ToolTip>
							<IconButton aria-label="Delete" onClick={() => handleDelete(id)}>
								<DeleteIcon className={classes.otherIcons} />
							</IconButton>
						</div>
						<CardContent className={classes.date}>
							<Typography variant="caption">
								{isUpdateAvailable !== null ? (
									<Countdown
										date={date}
										zeroPadTime={0}
										renderer={CountdownText}
										onComplete={() => toggleAvailability()}
									/>
								) : (
									"Not a uTubeFiltered playlist"
								)}
							</Typography>
						</CardContent>
					</div>
					<Badge
						classes={{ badge: classes.badge }}
						badgeContent={videoCount}
						color="secondary"
						invisible={!videoCount}
					>
						<CardMedia
							component="img"
							alt="playlist thumbnail"
							className={classes.cover}
							title={title}
							image={thumbnail}
						/>
					</Badge>
				</div>
			</Card>
		</Grid>
	);
}

PlaylistCard.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	fetchingItems: PropTypes.bool.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleRefresh: PropTypes.func.isRequired,
	handlePlay: PropTypes.func.isRequired,
	videoCount: PropTypes.number.isRequired,
	thumbnail: PropTypes.string.isRequired,
	plusPlaylistsUpdateBadge: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlaylistCard);
