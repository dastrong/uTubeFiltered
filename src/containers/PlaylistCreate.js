import React, { useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PlaylistForm from "../components/PlaylistForm";
import DialogBasicInner from "../components/DialogBasicInner";
import { description, formTagParams } from "../util/helpers";
import { createPlaylist } from "../store/actions/playlists";
import { handlePlaylistLoad, handlePlaylistMsg } from "../store/actions/ui";

const useStyles = makeStyles({
  flex: {
    flex: 1
  },
  content: {
    padding: "24px 16px 8px"
  },
  text: {
    fontStyle: "italic",
    textAlign: "center"
  },
  actions: {
    margin: 0,
    padding: "0 16px 16px"
  },
  actBtns: {
    margin: "0 0 0 4px"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -8
  },
  wrapper: {
    margin: "0 0 0 4px",
    position: "relative"
  }
});

const getState = state => ({
  token: state.currentUser.user.tokenAccess,
  isLoading: state.ui.playlists.isLoading,
  isError: state.ui.playlists.isError,
  message: state.ui.playlists.message
});

const initialState = { channels: [], query: "", title: "" };

const reducer = (state, action) => {
  const { type, channels, query, title } = action;
  if (type === "Channels") return { ...state, channels };
  if (type === "Query") return { ...state, query };
  if (type === "Title") return { ...state, title };
  if (type === "Reset") return initialState;
  return state;
};

export default function PlaylistCreate({ handleClose }) {
  const classes = useStyles();
  const storePatch = useDispatch();
  const { token, isLoading, isError, message } = useSelector(getState);
  const [state, formPatch] = useReducer(reducer, initialState);
  const { channels, query, title } = state;

  function handleSubmit() {
    storePatch(handlePlaylistLoad(true));
    const channelIds = channels.map(item => item.value);
    const tags = formTagParams(channelIds, query);
    storePatch(createPlaylist(token, { title, description, tags }));
  }

  const reset = useCallback(() => {
    formPatch({ type: "Reset" });
    storePatch(handlePlaylistMsg());
  }, [storePatch]);

  const closeBothDialogs = useCallback(() => {
    handleClose();
    storePatch(handlePlaylistMsg());
  }, [handleClose, storePatch]);

  return (
    <>
      <AppBar color="secondary" position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Create a Playlist
          </Typography>
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.content}>
        <DialogContentText className={classes.text}>
          Please fill in all fields.
        </DialogContentText>
        <PlaylistForm {...state} token={token} formPatch={formPatch} />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          size="large"
          color="primary"
          onClick={handleClose}
          className={classes.actBtns}
        >
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            autoFocus
            size="large"
            color="secondary"
            variant="outlined"
            onClick={handleSubmit}
            className={classes.actBtns}
            disabled={
              isLoading ||
              channels.length === 0 ||
              query.length < 3 ||
              title.length < 4 ||
              query.length > 30 ||
              title.length > 15
            }
          >
            Create
          </Button>
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>

      <Dialog
        open={!!message}
        fullWidth
        onClose={handlePlaylistMsg}
        aria-labelledby="create-playlist-title"
        aria-describedby="create-playlist-text"
      >
        <DialogBasicInner
          name="create-playlist"
          title={
            isError
              ? "Sorry, something went wrong"
              : "Successfully created playlist"
          }
          msg={message || ""}
          negText={isError ? "Go back." : "No, thanks."}
          posText={isError ? "Try again?" : "Yes, please."}
          negFunc={closeBothDialogs}
          posFunc={reset}
        />
      </Dialog>
    </>
  );
}

PlaylistCreate.propTypes = {
  handleClose: PropTypes.func.isRequired
};
