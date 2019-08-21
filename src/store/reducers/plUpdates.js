import { NEW_VIDEO_COUNT, VIDEO_ADDED, RESET_PL_UPDATES } from "../actionTypes";

const initialState = {
  newVideoCount: 0,
  videosAdded: 0
};

export default (state = initialState, action) => {
  const { type, newVideoCount } = action;
  const { videosAdded } = state;
  switch (type) {
    case NEW_VIDEO_COUNT:
      return { ...state, newVideoCount };
    case VIDEO_ADDED:
      return { ...state, videosAdded: videosAdded + 1 };
    case RESET_PL_UPDATES:
      return { ...initialState };
    default:
      return state;
  }
};
