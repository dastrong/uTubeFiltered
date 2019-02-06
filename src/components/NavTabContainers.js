import React from "react";
// import PlaylistForm from "../containers/PlaylistForm";
import Playlists from "../containers/Playlists";
import Player from "../containers/Player";

const NavTabContainers = ({ value }) => (
	<div>
		{value === 0 && (
			<div>
				<p>add</p>
				<p>info</p>
				<p>here</p>
			</div>
		)}
		{value === 1 && <Playlists />}
		{value === 2 && <Player />}
		{value === 3 && (
			<div>
				<p>add</p>
				<p>subs</p>
				<p>here</p>
			</div>
		)}
		{value === 4 && (
			<div>
				<p>add</p>
				<p>help</p>
				<p>here</p>
			</div>
		)}
	</div>
);

export default NavTabContainers;

// <PlaylistForm token={token} />
