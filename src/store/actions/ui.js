import {
	CHANGE_TAB,
	CLIENT_LOADED,
	PLAYLIST_LOADER,
	PLAYLIST_MESSAGE,
	PLAYLIST_UPDATE_BADGE,
	PLAYLIST_UPDATE_BADGE_PLUS,
	PLAYLIST_UPDATE_BADGE_MINUS,
} from "../actionTypes";

export const handleClient = () => ({
	type: CLIENT_LOADED,
});

export const handleTabChange = value => ({
	type: CHANGE_TAB,
	value,
});

export const handlePlaylistLoad = isLoading => ({
	type: PLAYLIST_LOADER,
	isLoading,
});

export const handlePlaylistMsg = (isError = null, message = null) => ({
	type: PLAYLIST_MESSAGE,
	isLoading: false,
	isError,
	message,
});

export const handlePlaylistsUpdateBadge = value => ({
	type: PLAYLIST_UPDATE_BADGE,
	value,
});

export const plusPlaylistsUpdateBadge = () => ({
	type: PLAYLIST_UPDATE_BADGE_PLUS,
});

export const minusPlaylistsUpdateBadge = () => ({
	type: PLAYLIST_UPDATE_BADGE_MINUS,
});
