import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import TvIcon from "@material-ui/icons/LiveTv";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import SubsIcon from "@material-ui/icons/Subscriptions";
import PlaylistIcon from "@material-ui/icons/PlaylistPlay";
import { withStyles } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";

const styles = {
  tabs: {
    flex: "auto",
    maxWidth: 150,
    minWidth: 60
  }
};

const NavTabs = ({
  classes,
  value,
  handleChange,
  isAuthenticated,
  currentVideoId,
  plUpdAvail
}) => (
  <Paper square>
    <Tabs
      value={value}
      onChange={handleChange}
      centered
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab className={classes.tabs} icon={<InfoIcon />} />
      <Tab
        disabled={!isAuthenticated}
        className={classes.tabs}
        label={
          <Badge
            color="secondary"
            badgeContent={plUpdAvail}
            invisible={!plUpdAvail}
          >
            <PlaylistIcon />
          </Badge>
        }
      />
      <Tab
        disabled={!isAuthenticated || !currentVideoId}
        className={classes.tabs}
        icon={<TvIcon />}
      />
      <Tab
        disabled={!isAuthenticated}
        className={classes.tabs}
        icon={<SubsIcon />}
      />
      <Tab className={classes.tabs} icon={<HelpIcon />} />
    </Tabs>
  </Paper>
);

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default withStyles(styles)(NavTabs);
