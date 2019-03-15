import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = { tooltip: { margin: 0 } };

const ToolTip = ({ classes, children, title }) => (
  <Tooltip classes={classes} title={title}>
    <div>{children}</div>
  </Tooltip>
);

export default withStyles(styles)(ToolTip);
