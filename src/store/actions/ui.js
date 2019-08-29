import {
	CHANGE_TAB,
	CLIENT_LOADED,
	SET_QUOTA,
	TOGGLE_AUTO_DELETE,
	PLAYLISTS_LOADER,
	PLAYLISTS_UPDATE_BADGE,
	PLAYLISTS_UPDATE_BADGE_PLUS,
	PLAYLISTS_UPDATE_BADGE_MINUS
} from "../actionTypes";

export const setClient = () => ({
	type: CLIENT_LOADED
});

export const setQuota = isQuotaFull => ({
	type: SET_QUOTA,
	isQuotaFull
});

export const setTab = value => ({
	type: CHANGE_TAB,
	value
});

export const toggleAutoDelete = () => ({
	type: TOGGLE_AUTO_DELETE
});

export const setPlaylistsLoader = arePlLoading => ({
	type: PLAYLISTS_LOADER,
	arePlLoading
});

export const setPlUpdBadge = value => ({
	type: PLAYLISTS_UPDATE_BADGE,
	value
});

export const incrPlUpdBadge = () => ({
	type: PLAYLISTS_UPDATE_BADGE_PLUS
});

export const decrPlUpdBadge = () => ({
	type: PLAYLISTS_UPDATE_BADGE_MINUS
});
