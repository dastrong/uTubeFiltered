import debounce from "debounce-promise";
import { fetcher, fetchURL, createURLstr } from "./helpers";

const halfURL = fetchURL("search");

export const noOptionsMessage = ({ inputValue }) => {
	if (inputValue.length < 4) return "Min. 4 characters needed";
	if (inputValue.length > 20) return "Max. 20 characters allowed";
	return "Channel Not Found";
};

export const loadMultiOptions = token =>
	debounce(async inputValue => {
		if (inputValue.length < 4 || inputValue.length > 20) return;
		try {
			const params = {
				part: "snippet",
				type: "channel",
				maxResults: 10,
				channelType: "any",
				q: inputValue,
			};
			const fullURL = createURLstr(halfURL, params);
			const resp = await fetcher("GET", fullURL, token);
			const results = await resp.json();
			return results.items.map(item => ({
				label: item.snippet.channelTitle,
				value: item.snippet.channelId,
				thumb: item.snippet.thumbnails.default.url,
			}));
		} catch (err) {
			console.log(err);
			alert(err);
		}
	}, 1500);
