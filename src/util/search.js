import debounce from "debounce-promise";
import { showSnackBar } from "../store/actions/snacks";
import { fetchURL, apiRequest } from "./helpers";
import { stripChannelSearch } from "./strippers";
import { handleError } from "./error";

const halfURL = fetchURL("search");

export const noOptionsMessage = ({ inputValue }, isSearchable) => {
  if (!isSearchable) return "Max. 3 channels allowed";
  if (inputValue.length < 3) return "Min. 3 characters needed";
  if (inputValue.length > 20) return "Max. 20 characters allowed";
  return "Channel Not Found";
};

export const loadMultiOptions = (token, dispatch) =>
  debounce(async inputValue => {
    if (inputValue.length < 3 || inputValue.length > 20) return;
    try {
      // https://developers.google.com/youtube/v3/docs/search/list#parameters
      const params = {
        part: "snippet",
        type: "channel",
        maxResults: 10,
        channelType: "any",
        q: inputValue
      };
      const { items } = await apiRequest("GET", halfURL, token, params);
      return items.map(item => stripChannelSearch(item));
    } catch (err) {
      handleError(dispatch, err);
      dispatch(showSnackBar("error", `An error occured [${err.code}]`));
    }
  }, 1500);
