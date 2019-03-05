import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";

const styles = theme => ({
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
});

const PlayerListHeader = ({
  classes,
  playlistTitle,
  autoDelete,
  toggleAutoDelete
}) => (
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
          onChange={toggleAutoDelete}
        />
      }
      label="Auto Delete"
      labelPlacement="start"
    />
  </div>
);

PlayerListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  playlistTitle: PropTypes.string.isRequired,
  autoDelete: PropTypes.bool.isRequired,
  toggleAutoDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayerListHeader);
