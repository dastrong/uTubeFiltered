export const fetchURL = type =>
	`https://www.googleapis.com/youtube/v3/${type}?key=${
		process.env.REACT_APP_API_KEY
	}`;

export const createURLstr = (
	url,
	options = {
		mine: true,
		maxResults: "25",
		part: "snippet",
	}
) =>
	Object.entries(options).reduce((acc, cVal) => {
		if (acc[acc.length - 1] === "?") {
			return `${acc}${cVal[0]}=${cVal[1]}`;
		} else {
			return `${acc}&${cVal[0]}=${cVal[1]}`;
		}
	}, url);

export const fetcher = (method, url, token, body = null) =>
	fetch(url, {
		method,
		body,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

export const description = `
Playlist created with uTubeFiltered.

Improve your productivity and avoid the YouTube wormhole. 

Try it at uTubeFiltered.netlify.com

*Do NOT edit this playlist's tags
`;
