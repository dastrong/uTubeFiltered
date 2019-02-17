import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";

const styles = {
	item: {
		margin: 5,
	},
	card: {
		boxShadow: "0 0 1px",
		// margin: "10px 0",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	clicker: {
		cursor: "pointer",
		display: "flex",
		padding: 0,
		alignItems: "center",
	},
	image: {
		width: 120,
	},
	content: {
		width: "100%",
		padding: "10px 5px 10px 15px!important",
	},
	text: {
		overflow: "hidden",
		maxHeight: 70,
	},
	icon: {
		borderRadius: 0,
		width: 60,
		alignSelf: "stretch",
	},
};

const PlaylistItemCard = ({ classes, title, thumbnail, handleDelete }) => (
	<Grid className={classes.item} item xs={12}>
		<Card className={classes.card}>
			<CardContent
				className={classes.clicker}
				onClick={e => console.log("update player with this video")}
			>
				<CardMedia
					component="img"
					alt="playlist thumbnail"
					className={classes.image}
					image={thumbnail}
					title={title}
				/>
				<CardContent className={classes.content}>
					<Typography className={classes.text} variant="body2">
						{title}
					</Typography>
				</CardContent>
			</CardContent>

			<IconButton
				className={classes.icon}
				aria-label="Delete"
				onClick={handleDelete}
			>
				<DeleteIcon />
			</IconButton>
		</Card>
	</Grid>
);

PlaylistItemCard.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	thumbnail: PropTypes.string.isRequired,
	// videoId?
	// handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(PlaylistItemCard);
