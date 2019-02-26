// used to strip all data from youtube
// response into a simple readable object
export const stripPlaylist = playlist => ({
  id: playlist.id,
  title: playlist.snippet.title,
  thumbnail: playlist.snippet.thumbnails.default.url,
  tags: stripTags(playlist.snippet.tags),
  fetchingItems: false,
  items: []
});

// used to strip the playlistItems
// response into a simple readable object
export const stripPlaylistItems = items =>
  items.map(item => ({
    videoId: item.snippet.resourceId.videoId,
    videoDate: item.snippet.publishedAt,
    videoTitle: item.snippet.title,
    channelId: item.snippet.channelId,
    channelName: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.default.url,
    description: item.snippet.description
  }));

// converts the tags array from our playlists
// into readable formats
function stripTags(tags) {
  const channels = tags[0].startsWith("channel:")
    ? tags[0].slice(8).split("&")
    : console.log("Incorrect Channel Format");

  const q = tags[1].startsWith("query:")
    ? tags[1].slice(6)
    : console.log("Incorrect Query Format");

  const lastDate = tags[2].startsWith("lastUpdate:")
    ? Number(tags[2].slice(11))
    : console.log("Incorrect Date Format");

  const strippedTags = { channels, q, lastDate };
  return strippedTags;
}
