// strip objects from youtube API
// responses into simple readable objects

// used to strip playlists
export const stripPlaylist = (playlist) => {
  return {
    id: playlist.id,
    title: playlist.snippet.title,
    tags: getTags(playlist.snippet.description),
    items: []
  };
};

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
export const stripChannelSearch = (item) => ({
  label: item.snippet.channelTitle,
  value: item.snippet.channelId,
  thumb: item.snippet.thumbnails.default.url
});

// used to strip and convert the tags
// array from our playlists
export function getTags(description) {
  try {
    const decodedDescription = JSON.parse(description);
    // checks to make sure tags are the present
    const { query, lastUpdate, channels } = decodedDescription;
    // catches all tampered playlists or playlists not created through this app
    if (!query || !lastUpdate || !channels) return null;
    // format and return the tags
    return {
      query,
      channels: channels.split("&"),
      lastUpdate: Number(lastUpdate)
    };
  } catch (err) {
    return null;
  }
}
