import { CHANGE_TAB, CLIENT_LOADED } from "../actionTypes";

export const handleClient = () => ({
  type: CLIENT_LOADED
});

export const handleTabChange = value => ({
  type: CHANGE_TAB,
  value
});
