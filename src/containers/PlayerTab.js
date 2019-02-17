import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Player from "../components/Player";
import PlaylistItemList from "../components/PlaylistItemList";

class PlayerTab extends Component {
	render() {
		return (
			<Grid container direction="row" justify="center" alignItems="flex-start">
				<Player />
				<PlaylistItemList />
			</Grid>
		);
	}
}

export default PlayerTab;
