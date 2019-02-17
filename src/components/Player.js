import React from "react";
import YouTube from "react-youtube";
import Grid from "@material-ui/core/Grid";

// import { connect } from "react-redux";

function _onFinish(e) {
	console.log("Video is Finished; Remove from Playlist");
}

// -X-this component renders an iFrame player containing the playlist given
// give the user an option to delete videos once they've been watched
// default should be auto delete
// it should listen and remove videos that have been watched
// show a subscribe button to the playing video's channel
// show a delete video from playlist button
// show an add to saved watch later playlist
// since watch later is not supported anymore
// maybe I should create a Saved Videos playlist when user clicks this button
// if user has already done this and has a saved videos playlist, skip the creation part
// show the playing videos statistic and info

const Player = props => (
	<Grid item xs={12} sm={10} md={6}>
		<YouTube
			opts={{
				width: "100%",
				maxWidth: "700px",
				playerVars: {
					autoplay: 1,
					iv_load_policy: 3,
					rel: 0,
					listType: "playlist",
					list: "PL81JazZ9FQVqXpP5iZ9enh5ewa4aq_-G3",
				},
			}}
			onEnd={_onFinish}
			// onStateChange={this.consoleIt}
			// onPlaybackRateChange={this.consoleIt}
			// onPlaybackQualityChange={this.consoleIt}
		/>
	</Grid>
);

export default Player;
