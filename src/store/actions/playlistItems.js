import {
  GET_PLAYLIST_ITEMS,
  FETCHING_PLAYLIST_ITEMS,
  DELETE_PLAYLIST_ITEM
} from "../actionTypes";
import { fetchURL, apiRequest } from "../../util/helpers";
import { stripPlaylistItem } from "../../util/strippers";
import { handlePlaylistMsg } from "./ui";

const halfItemsURL = fetchURL("playlistItems");
const halfSearchURL = fetchURL("search");
const halfVideosURL = fetchURL("videos");

export const fetchingPlaylistItems = id => ({
  type: FETCHING_PLAYLIST_ITEMS,
  id
});

export const handlePlaylistItems = (id, items) => ({
  type: GET_PLAYLIST_ITEMS,
  items,
  id
});

export const handleItemDelete = (vidId, playlistId) => ({
  type: DELETE_PLAYLIST_ITEM,
  vidId,
  playlistId
});

// THUNKS
export function getPlaylistItems(token, playlistId) {
  return async dispatch => {
    try {
      // https://developers.google.com/youtube/v3/docs/playlistItems/list#parameters
      const itemParams = {
        playlistId,
        part: "snippet",
        maxResults: 50
      };
      // get all items in user playlists
      const playlistItems = await apiRequest(
        "GET",
        halfItemsURL,
        token,
        itemParams
      );
      // save the id(to delete) with it's videoId
      const listItemIds = playlistItems.items.map(item => ({
        id: item.id,
        videoId: item.snippet.resourceId.videoId
      }));
      // https://developers.google.com/youtube/v3/docs/videos/list#parameters
      const videoParams = {
        id: listItemIds.map(item => item.videoId).join(),
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
      const strippedItems = extraItemDetails.items.map(item => {
        const id = listItemIds.find(({ videoId }) => item.id === videoId).id;
        return stripPlaylistItem(item, id);
      });
      dispatch(handlePlaylistItems(playlistId, strippedItems));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}

export function updatePlaylistItems(token, playlistId, tags) {
  return async dispatch => {
    try {
      // update ui to show we're processing the update
      dispatch(fetchingPlaylistItems(playlistId));
      // everything we need is kept in the playlist tags
      const { channels, q, lastDate } = tags;
      // search for video with the following params
      const params = {
        part: "id",
        // publishedAfter
        publishedBefore: new Date(lastDate).toISOString(),
        maxResults: 5,
        type: "video",
        q
      };
      // https://developers.google.com/youtube/v3/docs/search/list#parameters
      // returns results in an array named items
      const [{ items }] = await Promise.all(
        channels.map(async channelId => {
          return await apiRequest("GET", halfSearchURL, token, {
            channelId,
            ...params
          });
        })
      );
      // separates the videoIds into their own array
      const videoIds = items.map(item => item.id.videoId);
      // will throw if an error happens
      await insertPlaylistItems(token, playlistId, videoIds);
      // updates playlist so thumbnail updates
      dispatch(getPlaylistItems(token, playlistId));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}

export function deletePlaylistItem(token, playlistItemId, videoId, playlistId) {
  return async dispatch => {
    try {
      // https://developers.google.com/youtube/v3/docs/playlistItems/delete#parameters
      await apiRequest("DELETE", halfItemsURL, token, { id: playlistItemId });
      dispatch(handleItemDelete(videoId, playlistId));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}

// used to combat this issue: https://issuetracker.google.com/issues/35173743
// TLDR need to process request sequentially for 100% POST accuracy
async function insertPlaylistItems(token, playlistId, videoIds) {
  for (const videoId of videoIds) {
    const resourceId = { videoId, kind: "youtube#video" };
    const body = JSON.stringify({ snippet: { playlistId, resourceId } });
    // https://developers.google.com/youtube/v3/docs/playlistItems/list#parameters
    const params = { part: "snippet" };
    await apiRequest("POST", halfItemsURL, token, params, body);
    // throws an error if unsuccessful, but we won't
    // return anything here because getting all playlist
    // items is only worth 1 quota
  }
}
