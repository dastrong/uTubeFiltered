export default function useSort(playlists, sortBy, order) {
  const sortBys = ["VideoCount", "Title", "LastUpdate"];
  if (!sortBys.includes(sortBy)) {
    console.log("Couldn't find that sort method");
    return playlists;
  }
  const orders = ["ascending", "descending"];
  if (!orders.includes(order)) {
    console.log("Couldn't find that order method");
    return playlists;
  }

  const cb = sorters[sortBy];

  const sortedPlaylists = playlists.slice().sort(cb);

  return order === "ascending" ? sortedPlaylists : sortedPlaylists.reverse();
}

// compare functions
const sorters = {
  // low to high numbers
  VideoCount: (a, b) => a.items.length - b.items.length,
  // a -z
  Title: (a, b) => {
    const titleA = a.title.toUpperCase(); // ignore upper and lowercase
    const titleB = b.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  },
  // oldest first - non uTF playlists are put at the back
  LastUpdate: (a, b) => {
    if (!a.tags) return 1;
    if (!b.tags) return -1;
    return a.tags.lastUpdate - b.tags.lastUpdate;
  }
};
