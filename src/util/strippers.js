// strip objects from youtube API
// responses into simple readable objects

// used to strip playlists
export const stripPlaylist = playlist => ({
  id: playlist.id,
  title: playlist.snippet.title,
  tags: stripTags(playlist.snippet.tags),
  fetchingItems: false,
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
