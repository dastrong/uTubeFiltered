import {
	UI_PLAYLIST_PLAY,
	UI_PLAYLIST_CLEAR,
	UI_PLAYLIST_DELETE,
	UI_PLAYLIST_UPDATE,
	UI_PLAYLIST_ITEM_PLAY,
	UI_PLAYLIST_ITEM_DELETE,
	UI_PLAYLIST_ITEM_DELETE_REMOVE,
	UI_RESET_ALL_IDS
} from "../actionTypes";

export const playlistPlay = id => ({
	type: UI_PLAYLIST_PLAY,
	id
});

export const playlistDelete = id => ({
	type: UI_PLAYLIST_DELETE,
	id
});

export const playlistUpdate = id => ({
	type: UI_PLAYLIST_UPDATE,
	id
});

export const playlistClear = (name, id) => ({
	type: UI_PLAYLIST_CLEAR,
	name,
	id
});

export const plItemPlay = plItemId => ({
	type: UI_PLAYLIST_ITEM_PLAY,
	plItemId
});

export const plItemDelete = plItemId => ({
	type: UI_PLAYLIST_ITEM_DELETE,
	plItemId
});

export const plItemDeleteRemove = plItemId => ({
	type: UI_PLAYLIST_ITEM_DELETE_REMOVE,
	plItemId
});

export const resetAllIds = () => ({
	type: UI_RESET_ALL_IDS
});
