import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tabs, Tab, Paper, Badge, useMediaQuery } from "@material-ui/core/";
import TvIcon from "@material-ui/icons/LiveTv";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import SubsIcon from "@material-ui/icons/Subscriptions";
import PlaylistIcon from "@material-ui/icons/PlaylistPlay";
import ToolTip from "./ToolTip";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    zIndex: 111
  },
  tabs: {
    flex: "auto",
    maxWidth: 150,
    minWidth: 60,
    textAlign: "center"
  }
});

const TabWithToolTip = ({ className, title, disabled, children, ...rest }) => (
  <Tab
    {...rest}
    className={className}
    style={{ pointerEvents: "auto" }}
    disabled={disabled}
    label={<ToolTip title={title}>{children}</ToolTip>}
  />
);

export default function NavTabs({
  value,
  handleChange,
  isAuthenticated,
  isPlayerActive,
  plUpdAvail
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Paper square className={isMobile ? classes.root : ""}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab className={classes.tabs} icon={<InfoIcon />} />
        <TabWithToolTip
          disabled={!isAuthenticated}
          className={classes.tabs}
          title={!isAuthenticated ? "Login required" : ""}
        >
          <Badge
            color="secondary"
            badgeContent={plUpdAvail}
            invisible={!plUpdAvail}
          >
            <PlaylistIcon />
          </Badge>
        </TabWithToolTip>
        <TabWithToolTip
          disabled={!isAuthenticated || !isPlayerActive}
          className={classes.tabs}
          title={
            !isAuthenticated
              ? "Login required"
              : !isPlayerActive
              ? "Select a playlist first"
              : ""
          }
        >
          <TvIcon />
        </TabWithToolTip>
        <TabWithToolTip
          disabled={!isAuthenticated}
          className={classes.tabs}
          title={!isAuthenticated ? "Login required" : ""}
        >
          <SubsIcon />
        </TabWithToolTip>
        <Tab className={classes.tabs} icon={<HelpIcon />} />
      </Tabs>
    </Paper>
  );
}

NavTabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPlayerActive: PropTypes.bool.isRequired,
  plUpdAvail: PropTypes.number.isRequired
};
