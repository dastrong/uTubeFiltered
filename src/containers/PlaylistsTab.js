import React, { useReducer, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core/";
import PlaylistCreateIcon from "../components/PlaylistCreateIcon";
import PlaylistsCards from "./PlaylistsCards";
import PlaylistsSortIcons from "../components/PlaylistsSortIcons";
import DialogDeletePlaylist from "../components/DialogDeletePlaylist";
import DialogCreatePlaylist from "../components/DialogCreatePlaylist";
import { deletePlaylist } from "../store/actions/playlists";

const deleteVals = {
	deleteOpen: false,
	deleteId: null,
	shouldBadgeUpdate: false
};

const initialState = {
	sortBy: "LastUpdate",
	order: "ascending",
	createOpen: false,
	...deleteVals
};

const reducer = (state, action) => {
	const { type, sortBy, order, deleteId, shouldBadgeUpdate } = action;
	if (type === "Change_Sort") return { ...state, sortBy, order };
	if (type === "Delete_Close") return { ...state, ...deleteVals };
	if (type === "Delete_Open")
		return { ...state, deleteOpen: true, deleteId, shouldBadgeUpdate };
	if (type === "Create_Close") return { ...state, createOpen: false };
	if (type === "Create_Open") return { ...state, createOpen: true };
	return state;
};

export default function PlaylistsTab() {
	const storePatch = useDispatch();
	const token = useSelector(state => state.currentUser.user.tokenAccess);

	const [
		{ sortBy, order, createOpen, deleteOpen, deleteId, shouldBadgeUpdate },
		statePatch
	] = useReducer(reducer, initialState);

	const closeDialogs = useCallback(() => {
		statePatch({ type: "Create_Close" });
		statePatch({ type: "Delete_Close" });
	}, []);

	useLayoutEffect(() => {
		document.querySelector("body").scrollIntoView();
	}, [sortBy, order]);

	// fires when user confirms playlist deletion
	function deletePL() {
		storePatch(deletePlaylist(token, deleteId, shouldBadgeUpdate));
		statePatch({ type: "Delete_Close" });
	}

	return (
		<Grid container justify="center">
			<PlaylistsSortIcons statePatch={statePatch} />

			<PlaylistCreateIcon statePatch={statePatch} />

			<PlaylistsCards
				storePatch={storePatch}
				token={token}
				statePatch={statePatch}
				sortBy={sortBy}
				order={order}
			/>

			<DialogDeletePlaylist
				open={deleteOpen}
				negFunc={closeDialogs}
				posFunc={deletePL}
			/>

			<DialogCreatePlaylist open={createOpen} negFunc={closeDialogs} />
		</Grid>
	);
}
