import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrPlUpdBadge } from "../store/actions/ui";

// time in ms
const oneHour = 3600000;
const numOfHours = 1;
const maxTimer = oneHour * numOfHours;
const oneDay = 86400000;

// updates our PL badge - shows user how many playlists can be updated
// - it won't have 100% accuraty, due to using setTimeout but we
// - could recompare the lastUpdate and Date.now in the useEffect and
// - try to get them matched closer for better accuracy later
export default function usePlUpdateNotifier(playlists) {
	// get the store dispatch method
	const dispatch = useDispatch();

	// find out which playlist is the next to have an update available
	const dateNow = Date.now();
	const updatablePLs = playlists.filter(
		({ tags }) => tags && dateNow < tags.lastUpdate + oneDay
	);
	const lastUpdateTimes = updatablePLs.map(({ tags }) => tags.lastUpdate);
	const nextUpdateTime = Math.min(...lastUpdateTimes);

	useEffect(() => {
		if (nextUpdateTime === Infinity) return;
		// determine how long until the next is available in ms
		const timeToUpdate = nextUpdateTime + oneDay - dateNow;
		// skip setting an update timer if the next update is over the maxTimer
		if (timeToUpdate > maxTimer) return;
		console.log("setting update timer");
		// set timer
		const id = setTimeout(() => dispatch(incrPlUpdBadge()), timeToUpdate);
		// if the playlist chosen above was deleted, cancel the timer
		return () => clearTimeout(id);
	}, [nextUpdateTime, dispatch]);
}
