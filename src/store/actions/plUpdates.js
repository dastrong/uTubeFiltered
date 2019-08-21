import { NEW_VIDEO_COUNT, VIDEO_ADDED, RESET_PL_UPDATES } from "../actionTypes";

export const setNewVideoCount = newVideoCount => ({
  type: NEW_VIDEO_COUNT,
  newVideoCount
});

export const incrVideosAdded = () => ({
  type: VIDEO_ADDED
});

export const resetPlUpdated = () => ({
  type: RESET_PL_UPDATES
});
