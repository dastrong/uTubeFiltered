import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Typography, Switch } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import { toggleAutoDelete } from "../store/actions/player";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 10px 0",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "5px 10px"
    }
  },
  title: {
    fontSize: "1rem"
  },
  autoDelete: {
    fontSize: "0.75rem"
  }
}));

export default function PlayerListHeader(props) {
  const { playlistTitle, autoDelete, storePatch } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="subtitle2">
        {playlistTitle}
      </Typography>
      <FormControlLabel
        className={classes.autoDelete}
        control={
          <Switch
            checked={autoDelete}
            checkedIcon={<CheckIcon />}
            color="primary"
            onChange={() => storePatch(toggleAutoDelete())}
          />
        }
        label="Auto Delete"
        labelPlacement="start"
      />
    </div>
  );
}

PlayerListHeader.propTypes = {
  playlistTitle: PropTypes.string.isRequired,
  autoDelete: PropTypes.bool.isRequired,
  storePatch: PropTypes.func.isRequired
};
