import {
  CHANGE_TAB,
  CLIENT_LOADED,
  PLAYLIST_LOADER,
  PLAYLIST_MESSAGE
} from "../actionTypes";

const initialState = {
  isClientLoaded: false,
  tabValue: 0,
  playlists: {
    isLoading: true,
    isError: null,
    message: null
  }
};

export default (state = initialState, action) => {
  const { type, value, isLoading, isError, message } = action;
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tabValue: value
      };
    case CLIENT_LOADED:
      return {
        ...state,
        isClientLoaded: true
      };
    case PLAYLIST_LOADER:
      return {
        ...state,
        playlists: { ...state.playlists, isLoading }
      };
    case PLAYLIST_MESSAGE:
      return {
        ...state,
        playlists: { ...state.playlists, isError, message }
      };
    default:
      return state;
  }
};
