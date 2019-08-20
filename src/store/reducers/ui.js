import {
  CHANGE_TAB,
  CLIENT_LOADED,
  TOGGLE_AUTO_DELETE,
  PLAYLISTS_LOADER,
  PLAYLISTS_UPDATE_BADGE,
  PLAYLISTS_UPDATE_BADGE_PLUS,
  PLAYLISTS_UPDATE_BADGE_MINUS
} from "../actionTypes";

const initialState = {
  isClientLoaded: false,
  // add me
  isQuotaFull: false,
  autoDelete: true,
  arePlLoading: true,
  tabValue: 0,
  updateAvailCount: 0
};

export default (state = initialState, action) => {
  const { type, value, arePlLoading } = action;
  const { updateAvailCount, autoDelete } = state;
  switch (type) {
    case CLIENT_LOADED:
      return { ...state, isClientLoaded: true };
    case CHANGE_TAB:
      return { ...state, tabValue: value };
    case TOGGLE_AUTO_DELETE:
      return { ...state, autoDelete: !autoDelete };
    case PLAYLISTS_LOADER:
      return { ...state, arePlLoading };
    case PLAYLISTS_UPDATE_BADGE:
      return { ...state, updateAvailCount: value };
    case PLAYLISTS_UPDATE_BADGE_PLUS:
      return { ...state, updateAvailCount: updateAvailCount + 1 };
    case PLAYLISTS_UPDATE_BADGE_MINUS:
      return { ...state, updateAvailCount: updateAvailCount - 1 };
    default:
      return state;
  }
};
