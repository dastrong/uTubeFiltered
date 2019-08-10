import React, { forwardRef } from "react";
import { Dialog, Slide, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PlaylistCreate from "../containers/PlaylistCreate";

const useStyles = makeStyles({
  root: {
    padding: "0!important"
  },
  paper: {
    width: "100%"
  }
});

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" {...props} ref={ref} />
));

export default function DialogCreatePlaylist({ open, negFunc }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={negFunc}
      TransitionComponent={Transition}
      classes={{ paper: classes.paper, root: classes.root }}
    >
      <PlaylistCreate handleClose={negFunc} />
    </Dialog>
  );
}
