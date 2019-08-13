import React, { useReducer, useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import PlaylistCreateIcon from "../components/PlaylistCreateIcon";
import PlaylistsSortIcons from "../components/PlaylistsSortIcons";
import PlaylistsCards from "../components/PlaylistsCards";
import DialogDeletePlaylist from "../components/DialogDeletePlaylist";
import DialogCreatePlaylist from "../components/DialogCreatePlaylist";
import useSort from "../hooks/useSort";
import { deletePlaylist } from "../store/actions/playlists";
import { minusPlaylistsUpdateBadge } from "../store/actions/ui";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 48
    }
  }
}));

const playlistSelector = state => state.playlists;
const tokenSelector = state => state.currentUser.user.tokenAccess;

const getState = createSelector(
  playlistSelector,
  tokenSelector,
  (playlists, token) => ({ playlists, token })
);

const deleteVals = {
  deleteOpen: false,
  deleteId: null,
  shouldBadgeUpdate: false
};
const initialState = {
  sortBy: "LastUpdate",
  order: "ascending",
  createOpen: false,
  ...deleteVals
};

const reducer = (state, action) => {
  const { type, sortBy, order, deleteId, shouldBadgeUpdate } = action;
  if (type === "Change_Sort") return { ...state, sortBy, order };
  if (type === "Delete_Close") return { ...state, ...deleteVals };
  if (type === "Delete_Open")
    return { ...state, deleteOpen: true, deleteId, shouldBadgeUpdate };
  if (type === "Create_Close") return { ...state, createOpen: false };
  if (type === "Create_Open") return { ...state, createOpen: true };
  return state;
};

export default function PlaylistsTab() {
  const classes = useStyles();
  const storePatch = useDispatch();
  const { playlists, token } = useSelector(getState);

  const [state, statePatch] = useReducer(reducer, initialState);
  const {
    sortBy,
    order,
    createOpen,
    deleteOpen,
    deleteId,
    shouldBadgeUpdate
  } = state;
  const closeDialogs = useCallback(() => {
    statePatch({ type: "Create_Close" });
    statePatch({ type: "Delete_Close" });
  }, []);

  const sortedPlaylists = useSort(playlists, sortBy, order);

  useLayoutEffect(() => {
    document.querySelector("body").scrollIntoView();
  }, [sortBy, order]);

  // fires when user confirms playlist deletion
  function deletePL() {
    storePatch(deletePlaylist(token, deleteId));
    statePatch({ type: "Delete_Close" });
    // if the playlist isn't available for an update stop here
    if (!shouldBadgeUpdate) return;
    // if it does have an updateAvailable, remove it from our badge count
    storePatch(minusPlaylistsUpdateBadge());
  }

  return (
    <Grid container justify="center" className={classes.container}>
      <PlaylistsSortIcons statePatch={statePatch} />

      <PlaylistCreateIcon statePatch={statePatch} />

      <PlaylistsCards
        storePatch={storePatch}
        playlists={sortedPlaylists}
        token={token}
        statePatch={statePatch}
        sorter={sortBy + order}
      />

      <DialogDeletePlaylist
        open={deleteOpen}
        negFunc={closeDialogs}
        posFunc={deletePL}
      />

      <DialogCreatePlaylist open={createOpen} negFunc={closeDialogs} />
    </Grid>
  );
}
