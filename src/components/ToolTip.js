import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({ tooltip: { margin: 0, fontSize: "0.8rem" } });

// we are wrapping it in a div, so they'll appear on disabled elements
// classes are general styles for all tooltips
// className is more specific
export default function ToolTip({ className, children, title }) {
  const classes = useStyles();

  return (
    <Tooltip className={className} classes={classes} title={title}>
      <div>{children}</div>
    </Tooltip>
  );
}
