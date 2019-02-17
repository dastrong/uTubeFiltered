import { GET_PLAYLIST_ITEMS, FETCHING_PLAYLIST_ITEMS } from "../actionTypes";
import { fetchURL, createURLstr, fetcher } from "../../util/helpers";
import { handleMessage, getPlaylist } from "./playlists";
import { stripPlaylistItems } from "../../util/strippers";

const halfURL = fetchURL("playlistItems");
const halfSearchURL = fetchURL("search");

export const fetchingPlaylistItems = id => ({
	type: FETCHING_PLAYLIST_ITEMS,
	id,
});

export const handlePlaylistItems = (id, items) => ({
	type: GET_PLAYLIST_ITEMS,
	items,
	id,
});

// THUNKS
export function getPlaylistItems(token, playlistId) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL, {
				playlistId,
				part: "snippet",
				maxResults: 50,
			});
			const resp = await fetcher("GET", fullURL, token);
			const playlistItems = await resp.json();
			if (!resp.ok) throw playlistItems.error.message;
			const items = stripPlaylistItems(playlistItems.items);
			dispatch(handlePlaylistItems(playlistId, items));
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
		}
	};
}

export function updatePlaylistItems(token, playlistId, tags) {
	return async dispatch => {
		try {
			dispatch(fetchingPlaylistItems(playlistId));
			const { channels, q, lastDate } = tags;
			const params = {
				part: "id",
				// publishedAfter
				publishedBefore: new Date(lastDate).toISOString(),
				maxResults: 5,
				type: "video",
				q,
			};
			const respArr = await Promise.all(
				channels.map(async channelId => {
					const fullURL = createURLstr(halfSearchURL, { channelId, ...params });
					const resp = await fetcher("GET", fullURL, token);
					const item = await resp.json();
					if (!resp.ok) throw item;
					return item;
				})
			);
			// combine all returned videoIds into 1 array
			const videoIds = respArr
				.map(resp => resp.items.map(item => item.id.videoId))
				.reduce((acc, cVal) => acc.concat(cVal));
			// throws if an error happens
			// doesn't return anything
			await insertPlaylistItems(token, playlistId, videoIds);
			// need to get the updated playlist first
			// so thumbnails are updated
			dispatch(getPlaylist(token, playlistId));
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
		}
	};
}

// used to combat this issue: https://issuetracker.google.com/issues/35173743
// TLDR need to process request sequentially for 100% accuracy
async function insertPlaylistItems(token, playlistId, videoIds) {
	for (const videoId of videoIds) {
		const snippet = {
			playlistId,
			resourceId: { videoId, kind: "youtube#video" },
		};
		const fullURL = createURLstr(halfURL);
		const body = JSON.stringify({ snippet });
		const resp = await fetcher("POST", fullURL, token, body);
		const result = await resp.json();
		if (!resp.ok) throw result.error.message;
		// don't need to return anything
		// because getting all playlist items is only worth 1 quota
	}
}
