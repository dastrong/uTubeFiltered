import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, FormControlLabel } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import PlaylistItemCard from "./PlaylistItemCard";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";

const styles = {
	container: {
		// backgroundColor: "blue",
	},
	title: {
		// color: "pink",
	},
};

const PlaylistItemList = ({ classes }) => (
	<Grid className={classes.container} item xs={12} sm={10} md={4} container>
		<Typography className={classes.title} variant="h4">
			The Jumps
		</Typography>
		<FormControlLabel
			control={
				<Switch
					checked={true}
					checkedIcon={<CheckIcon />}
					color="primary"
					onChange={e => console.log("auto delete on/off")}
				/>
			}
			label="Auto Delete"
			labelPlacement="start"
		/>
		<PlaylistItemCard
			title="Luka Doncic to Rachel Nichols: I've always played like this | The Jump"
			thumbnail="https://i.ytimg.com/vi/TMNWaYsuxoc/default.jpg"
		/>
		<PlaylistItemCard
			title="Luka Doncic to Rachel Nichols: I've always played like this | The Jump"
			thumbnail="https://i.ytimg.com/vi/TMNWaYsuxoc/default.jpg"
		/>
		<PlaylistItemCard
			title="Luka Doncic to Rachel Nichols: I've always played like this | The Jump"
			thumbnail="https://i.ytimg.com/vi/TMNWaYsuxoc/default.jpg"
		/>
	</Grid>
);

PlaylistItemList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaylistItemList);
