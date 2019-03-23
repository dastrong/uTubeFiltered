// returns successful results or throws an error message string
// used to interact with the Youtube Data API
export async function apiRequest(method, halfURL, token, params, body = null) {
	// puts url and params together for a complete string
	const fullURL = addParamsToUrl(halfURL, params);
	const blob = await fetcher(method, fullURL, token, body);
	// if something was successfully deleted return out
	if (blob.status === 204) return;
	const resp = await blob.json();
	// if there's an error throw that message
	if (!blob.ok) throw resp.error.message;
	// otherwise return the results
	return resp;
}

// returns an API string without parameters
export function fetchURL(type) {
	const start = "https://www.googleapis.com/youtube/v3/";
	const apiKey = process.env.REACT_APP_API_KEY;
	return `${start}${type}?key=${apiKey}`;
}

// readies URL by adding parameters to the url above
function addParamsToUrl(url, params) {
	return Object.entries(params).reduce((acc, cVal) => {
		if (acc[acc.length - 1] === "?") {
			return `${acc}${cVal[0]}=${cVal[1]}`;
		} else {
			return `${acc}&${cVal[0]}=${cVal[1]}`;
		}
	}, url);
}

// took the fetch out from apiRequest to make it look cleaner
function fetcher(method, url, token, body) {
	return fetch(url, {
		method,
		body,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
}

// used when creating playlists
export const description = `
Playlist created with uTubeFiltered.

Improve your productivity and avoid the YouTube wormhole. 

Try it at uTubeFiltered.netlify.com

*Do NOT edit this playlist's tags
`;

// formats date like YouTube does
export function convertDateToString(date) {
	// creates string like 'Feb 27 2018'
	const splitDate = new Date(date)
		.toDateString()
		.slice(4)
		.split("");
	// add a comma after the date value and join it again
	splitDate[6] = ", ";
	return splitDate.join("");
}

// used in PlayerTab to handle the playlist items logic
export const handleVideoPlayer = (flagger, funcs, values, vidIds) => (
	clickedVidIds,
	isPlaying
) => {
	// destructure the different redux actions used below
	const { handleTabChange, setVideoId, setPlaylistId, deleteItem } = funcs;
	const { token, items, playlistId } = values;
	// did a video finish playing or did the user click to delete
	const ids = vidIds ? vidIds : clickedVidIds;
	// destructures the two types of video ids we need later
	const { playlistItemId, videoId } = ids;
	// if the video isn't playing, skip this following logic
	if (isPlaying || isPlaying === undefined) {
		// check if there are anymore videos to watch
		if (items.length === 1 && flagger) {
			// go back to playlists tab
			handleTabChange(1);
			// reset the player and
			setVideoId(null);
			setPlaylistId(null);
		} else {
			// selects the next video in the items
			nextVideo(items, videoId, setVideoId);
		}
		// if autoDelete is off, don't delete the video
		if (!flagger) return;
	}
	// dispatch our action to delete the playlist item above
	deleteItem(token, playlistItemId, videoId, playlistId);
};

// handles the next video logic in handleVideoPlayer
function nextVideo(items, videoId, setVideoId) {
	const currentIndex = items.findIndex(item => item.videoId === videoId);
	const nextVideoId =
		items.length - 1 === currentIndex
			? items[0].videoId
			: items[currentIndex + 1].videoId;
	setVideoId(nextVideoId);
}

// turns our readable format into the needed format for YouTube's API
export function formTagParams(channelIds, query) {
	const tagChannels = channelIds.reduce(
		(acc, cVal, i, arr) =>
			acc.concat(`${cVal}${arr.length - 1 !== i ? "&" : ""}`),
		"channel:"
	);
	const tagQuery = `query:${query}`;
	const lastUpdate = `lastUpdate:${Date.now()}`;
	return [tagChannels, tagQuery, lastUpdate];
}
