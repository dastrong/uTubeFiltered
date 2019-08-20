import {
  UI_PLAYLIST_PLAY,
  UI_PLAYLIST_CLEAR,
  UI_PLAYLIST_DELETE,
  UI_PLAYLIST_UPDATE,
  UI_PLAYLIST_ITEM_PLAY,
  UI_PLAYLIST_ITEM_CLEAR,
  UI_PLAYLIST_ITEM_DELETE,
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

export const playlistClear = name => ({
  type: UI_PLAYLIST_CLEAR,
  name
});

export const plItemPlay = (plItemId, videoId) => ({
  type: UI_PLAYLIST_ITEM_PLAY,
  plItemId,
  videoId
});

export const plItemDelete = (plItemId, videoId) => ({
  type: UI_PLAYLIST_ITEM_DELETE,
  plItemId,
  videoId
});

export const plItemClear = name => ({
  type: UI_PLAYLIST_ITEM_CLEAR,
  name
});

export const resetAllIds = () => ({
  type: UI_RESET_ALL_IDS
});
