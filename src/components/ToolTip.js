import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = { tooltip: { margin: 0, fontSize: "0.8rem" } };

// we are wrapping it in a div, so they'll appear on disabled elements
// classes are general styles are all tooltips
// className is more specific
const ToolTip = ({ classes, className, children, title }) => (
	<Tooltip className={className} classes={classes} title={title}>
		<div>{children}</div>
	</Tooltip>
);

export default withStyles(styles)(ToolTip);
