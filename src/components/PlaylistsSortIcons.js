import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import { Icon, useMediaQuery } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import CloseIcon from "@material-ui/icons/Close";
import AlphaIcon from "@material-ui/icons/SortByAlpha";
import DateIcon from "@material-ui/icons/DateRange";
import LengthIcon from "@material-ui/icons/ShortText";

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: "absolute",
    left: 5,
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
      bottom: 53
    }
  },
  fab: {
    width: "48px",
    height: "48px",
    margin: "auto 4px",
    opacity: 0.77,
    backgroundColor: "rgb(245, 0, 87)",
    transition: "125ms opacity",
    "&:hover": {
      opacity: 1,
      backgroundColor: "rgb(245, 0, 87)"
    }
  },
  actions: {
    opacity: 1,
    transition: "225ms opacity",
    "&$directionDown": {
      marginTop: -28,
      paddingTop: 33
    },
    "&$directionUp": {
      marginBottom: -28,
      paddingBottom: 33
    },
    "&$directionRight": {
      marginLeft: -27,
      paddingLeft: 30
    }
  },
  actionsClosed: { opacity: 0 },
  directionDown: {},
  directionUp: {},
  directionRight: {},
  popper: {
    width: 96,
    textAlign: "center",
    left: "29px !important"
  },
  tooltipPlacementBottom: { margin: "6px 0 0" }
}));

const mainActions = [
  {
    icon: <AlphaIcon />,
    sortBy: "Title",
    tooltipTitle: "Sort By Title",
    iconCX: ["fas fa-sort-alpha-up-alt", "fas fa-sort-alpha-down-alt"]
  },
  {
    icon: <LengthIcon />,
    sortBy: "VideoCount",
    tooltipTitle: "Sort By Video Count",
    iconCX: ["fas fa-sort-numeric-up-alt", "fas fa-sort-numeric-down-alt"]
  },
  {
    icon: <DateIcon />,
    sortBy: "LastUpdate",
    tooltipTitle: "Sort By Last Update",
    iconCX: ["fas fa-sort-amount-up-alt", "fas fa-sort-amount-down-alt"]
  }
];

export default function PlaylistsSortIcons({ statePatch }) {
  const classes = useStyles();
  const {
    speedDial,
    fab,
    actions,
    actionsClosed,
    directionDown,
    directionUp,
    directionRight,
    popper,
    tooltipPlacementBottom
  } = classes;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [dialOpen, setDial] = useState(false);

  const mainToggle = () => setDial(state => !state);
  const mainClose = () => setDial(false);
  const mainOpen = () => setDial(true);

  return (
    <SpeedDial
      ariaLabel="sort speed dial"
      className={speedDial}
      classes={{ actions, actionsClosed, directionDown, directionUp }}
      icon={<SpeedDialIcon icon={<SortIcon />} openIcon={<CloseIcon />} />}
      onBlur={mainClose}
      onClick={mainToggle}
      onClose={mainClose}
      onFocus={mainOpen}
      onMouseEnter={mainOpen}
      onMouseLeave={mainClose}
      open={dialOpen}
      direction={isMobile ? "up" : "down"}
    >
      {mainActions.map(({ sortBy, icon, iconCX, tooltipTitle }) => (
        <SpeedDialer
          key={sortBy}
          icon={icon}
          classes={{ fab, actions, actionsClosed, directionRight }}
          direction="right"
        >
          <SpeedDialAction
            onClick={() =>
              statePatch({ type: "Change_Sort", order: "ascending", sortBy })
            }
            icon={<Icon className={iconCX[0]} />}
            tooltipTitle={tooltipTitle}
            tooltipPlacement="bottom"
            tooltipOpen={true}
            TooltipClasses={{ popper, tooltipPlacementBottom }}
          />
          <SpeedDialAction
            onClick={() =>
              statePatch({ type: "Change_Sort", order: "descending", sortBy })
            }
            icon={<Icon className={iconCX[1]} />}
            tooltipTitle=""
            tooltipPlacement="bottom"
            tooltipOpen={false}
          />
        </SpeedDialer>
      ))}
    </SpeedDial>
  );
}

PlaylistsSortIcons.propTypes = {
  statePatch: PropTypes.func.isRequired
};

function SpeedDialer({ classes, icon, direction, children }) {
  const [dialOpen, setDial] = useState(false);

  const mainToggle = () => setDial(state => !state);
  const mainClose = () => setDial(false);
  const mainOpen = () => setDial(true);

  return (
    <SpeedDial
      ariaLabel="sort speed dial"
      classes={classes}
      icon={icon}
      onBlur={mainClose}
      onClick={mainToggle}
      onClose={mainClose}
      onFocus={mainOpen}
      onMouseEnter={mainOpen}
      onMouseLeave={mainClose}
      open={dialOpen}
      direction={direction}
    >
      {children}
    </SpeedDial>
  );
}
