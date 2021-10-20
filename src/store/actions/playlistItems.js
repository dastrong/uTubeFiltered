import { GET_PLAYLIST_ITEMS, DELETE_PLAYLIST_ITEM } from "../actionTypes";
import { fetchURL, apiRequest, createTagDescription } from "../../util/helpers";
import { stripPlaylistItem } from "../../util/strippers";
import { handleError } from "../../util/error";
import { updatePlaylist } from "./playlists";
import { showSnackBar } from "./snacks";
import {
  playlistUpdate,
  playlistClear,
  plItemDelete,
  plItemDeleteRemove
} from "./ids";
import { setNewVideoCount, resetPlUpdated, incrVideosAdded } from "./plUpdates";
import { decrPlUpdBadge } from "./ui";

const halfItemsURL = fetchURL("playlistItems");
const halfSearchURL = fetchURL("search");
const halfVideosURL = fetchURL("videos");

export const handlePlaylistItems = (id, items) => ({
  type: GET_PLAYLIST_ITEMS,
  items,
  id
});

export const handleItemDelete = (playlistItemId, playlistId) => ({
  type: DELETE_PLAYLIST_ITEM,
  playlistItemId,
  playlistId
});

// THUNKS
export function getPlaylistItems(token, playlistId) {
  return async (dispatch) => {
    try {
      // https://developers.google.com/youtube/v3/docs/playlistItems/list#parameters
      const itemParams = { playlistId, part: "snippet", maxResults: 50 };
      // get all items in user playlists
      const playlistItems = await apiRequest(
        "GET",
        halfItemsURL,
        token,
        itemParams
      );
      // save the id(to delete) with it's videoId
      const listItemIds = playlistItems.items.map((item) => ({
        id: item.id,
        videoId: item.snippet.resourceId.videoId
      }));
      // https://developers.google.com/youtube/v3/docs/videos/list#parameters
      const videoParams = {
        id: listItemIds.map((item) => item.videoId).join(),
        part: "snippet,statistics"
      };
      // get extra details about each video
      const extraItemDetails = await apiRequest(
        "GET",
        halfVideosURL,
        token,
        videoParams
      );
      // array of video objects that are filtered down
      const strippedItems = extraItemDetails.items.map((item) => {
        const id = listItemIds.find(({ videoId }) => item.id === videoId).id;
        return stripPlaylistItem(item, id);
      });
      dispatch(handlePlaylistItems(playlistId, strippedItems));
    } catch (err) {
      handleError(dispatch, err);
      dispatch(showSnackBar("error", `An error occured [${err.code}]`));
    }
  };
}

export function updatePlaylistItems(token, playlistId, tags, title) {
  return async (dispatch) => {
    try {
      // update ui to show we're processing the update
      dispatch(playlistUpdate(playlistId));
      // everything we need is kept in the playlist tags
      const { channels, query, lastUpdate } = tags;
      // search for video with the following params
      const dateNow = Date.now();
      const oneDay = 86400000;
      // how far back do initial playlists look back
      const numOfDays = 2;
      const params = {
        part: "id",
        publishedAfter: !title
          ? // if it's a new playlist, look back x num of days
            new Date(dateNow - oneDay * numOfDays).toISOString()
          : // otherwise use the last date timestamp
            new Date(lastUpdate).toISOString(),
        publishedBefore: new Date(dateNow).toISOString(),
        maxResults: 25,
        type: "video",
        q: query
      };
      // https://developers.google.com/youtube/v3/docs/search/list#parameters
      const results = await Promise.all(
        channels.map(async (channelId) => {
          return await apiRequest("GET", halfSearchURL, token, {
            channelId,
            ...params
          });
        })
      );
      // separates the videoIds into their own array
      const videoIds = results
        .map(({ items }) => items.map((item) => item.id.videoId))
        .reduce((acc, cVal) => [...acc, ...cVal]);
      dispatch(setNewVideoCount(videoIds.length));
      // will throw if an error happens
      await insertPlaylistItems(token, playlistId, videoIds, dispatch);
      // checks and skips updating playlist if it was just created
      // we only pass the title during updates
      if (title) {
        // update the playlist lastUpdate tag
        const description = createTagDescription(channels, query);
        const snippet = { title, description };
        // since we're updating a playlist we need to minus 1 from the playlist update badge
        dispatch(decrPlUpdBadge());
        dispatch(updatePlaylist(token, playlistId, snippet));
      }
      // get all playlist items again
      dispatch(getPlaylistItems(token, playlistId));
      dispatch(playlistClear("updating", ""));
      dispatch(resetPlUpdated());
      dispatch(showSnackBar("success", "Playlist Updated"));
    } catch (err) {
      handleError(dispatch, err);
      dispatch(playlistClear("updating", ""));
      dispatch(resetPlUpdated());
      dispatch(showSnackBar("error", `An error occured [${err.code}]`));
    }
  };
}

export function deletePlaylistItem(token, playlistItemId, playlistId) {
  return async (dispatch) => {
    try {
      dispatch(plItemDelete(playlistItemId));
      // https://developers.google.com/youtube/v3/docs/playlistItems/delete#parameters
      await apiRequest("DELETE", halfItemsURL, token, { id: playlistItemId });
      dispatch(handleItemDelete(playlistItemId, playlistId));
      dispatch(plItemDeleteRemove(playlistItemId));
      dispatch(showSnackBar("success", "Video deleted"));
    } catch (err) {
      handleError(dispatch, err);
      dispatch(plItemDeleteRemove(playlistItemId));
      dispatch(showSnackBar("error", `An error occured [${err.code}]`));
    }
  };
}

// used to combat this issue: https://issuetracker.google.com/issues/35173743
// TLDR need to process request sequentially for 100% POST accuracy
async function insertPlaylistItems(token, playlistId, videoIds, dispatch) {
  for (const videoId of videoIds) {
    const resourceId = { videoId, kind: "youtube#video" };
    const body = JSON.stringify({ snippet: { playlistId, resourceId } });
    // https://developers.google.com/youtube/v3/docs/playlistItems/list#parameters
    const params = { part: "snippet" };
    await apiRequest("POST", halfItemsURL, token, params, body);
    dispatch(incrVideosAdded());
    // throws an error if unsuccessful, but we won't
    // return anything here because getting all playlist
    // items is only worth 1 quota
  }
}
