import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistsTab from "./PlaylistsTab";
import PlayerTab from "./PlayerTab";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 10,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 48
    }
  }
}));

export default function TabContent() {
  const classes = useStyles();
  const value = useSelector(state => state.ui.tabValue);

  return (
    <div className={classes.container}>
      {value === 0 && (
        <div>
          <p>add</p>
          <p>info</p>
          <p>here</p>
        </div>
      )}
      {value === 1 && <PlaylistsTab />}
      {value === 2 && <PlayerTab />}
      {value === 3 && (
        <div>
          <p>add</p>
          <p>subs</p>
          <p>here</p>
        </div>
      )}
      {value === 4 && (
        <div>
          <p>add</p>
          <p>help</p>
          <p>here</p>
        </div>
      )}
    </div>
  );
}
