// strip objects from youtube API
// responses into simple readable objects

// used to strip playlists
export const stripPlaylist = playlist => ({
	id: playlist.id,
	title: playlist.snippet.title,
	tags: stripTags(playlist.snippet.tags),
	items: []
});

// used to strip the playlistItems
export const stripPlaylistItem = (item, id) => ({
	playlistItemId: id,
	videoId: item.id,
	videoDate: item.snippet.publishedAt,
	videoTitle: item.snippet.title,
	channelId: item.snippet.channelId,
	channelName: item.snippet.channelTitle,
	thumbnail: item.snippet.thumbnails.default.url,
	description: item.snippet.description,
	viewsCount: item.statistics.viewCount
});

// used to strip channel search results
// when creating new playlist
export const stripChannelSearch = item => ({
	label: item.snippet.channelTitle,
	value: item.snippet.channelId,
	thumb: item.snippet.thumbnails.default.url
});

// used to strip and convert the tags
// array from our playlists
export function stripTags(tags) {
	if (!tags) return null;
	// checks to make sure tags are the correct format
	const isValidTags = tags.every(
		tag =>
			tag.startsWith("channel:") ||
			tag.startsWith("query:") ||
			tag.startsWith("lastUpdate:")
	);
	if (!isValidTags) return null;
	// all tags must match the following three formats
	// catches all tampered playlists or playlists not created through this app
	return tags.reduce((acc, cVal) => {
		if (acc === null) return null;
		if (cVal.startsWith("channel:")) {
			acc.channels = cVal.slice(8).split("&");
		} else if (cVal.startsWith("query:")) {
			acc.query = cVal.slice(6);
		} else if (cVal.startsWith("lastUpdate:")) {
			acc.lastUpdate = Number(cVal.slice(11));
		} else return null;
		return acc;
	}, {});
}
