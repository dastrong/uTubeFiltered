import {
  SET_PLAYLIST_ID,
  SET_VIDEO_ID,
  TOGGLE_AUTO_DELETE
} from "../actionTypes";

const initialState = {
  playlistId: null,
  currentVideoId: null,
  autoDelete: true
};

export default (state = initialState, action) => {
  const { playlistId, currentVideoId } = action;
  switch (action.type) {
    case SET_PLAYLIST_ID:
      return { ...state, playlistId };
    case SET_VIDEO_ID:
      return { ...state, currentVideoId };
    case TOGGLE_AUTO_DELETE:
      return { ...state, autoDelete: !state.autoDelete };
    default:
      return state;
  }
};
