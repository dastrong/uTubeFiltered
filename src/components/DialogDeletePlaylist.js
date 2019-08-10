import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogBasicInner from "./DialogBasicInner";

export default function DialogDeletePlaylist(props) {
  const { open, negFunc, posFunc } = props;

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={negFunc}
      aria-labelledby="delete-playlist-title"
      aria-describedby="delete-playlist-text"
    >
      <DialogBasicInner
        name="delete-playlist"
        title="Are you sure you want to delete this playlist?"
        msg="There's no undoing this..."
        negText="Nvm, take me back."
        posText="Yes, I'm sure."
        negFunc={negFunc}
        posFunc={posFunc}
      />
    </Dialog>
  );
}
