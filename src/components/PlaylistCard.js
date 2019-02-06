import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import RefreshIcon from "@material-ui/icons/Refresh";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";

const styles = {
	card: {
		boxShadow: "0 0 8px #3f51b5",
		margin: 10,
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
	info: {
		width: "100%",
	},
	cover: {
		width: 151,
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
};

const PlaylistCard = ({
	classes,
	title,
	thumbnail,
	date,
	id,
	// handlePlay,
	handleRefresh,
	handleDelete,
	token,
}) => (
	<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Typography component="h5" variant="h5">
					{title}
				</Typography>
			</CardContent>
			<div className={classes.details}>
				<div className={classes.info}>
					<div className={classes.controls}>
						<IconButton aria-label="Refresh">
							<RefreshIcon
								disabled={true}
								onClick={() => handleRefresh(token, id)}
								className={classes.otherIcons}
							/>
						</IconButton>
						<IconButton aria-label="Play">
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
						<IconButton aria-label="Delete">
							<DeleteIcon
								onClick={() => handleDelete(token, id)}
								className={classes.otherIcons}
							/>
						</IconButton>
					</div>
					<CardContent className={classes.date}>
						<Typography component="p" variant="p">
							{date}
						</Typography>
					</CardContent>
				</div>
				<CardMedia
					component="img"
					alt="playlist thumbnail"
					className={classes.cover}
					image={thumbnail}
					title={title}
				/>
			</div>
		</Card>
	</Grid>
);

PlaylistCard.propTypes = {
	title: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	classes: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleRefresh: PropTypes.func.isRequired,
	// handlePlay: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlaylistCard);
