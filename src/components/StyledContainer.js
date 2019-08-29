import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container: {
		"& .MuiContainer-root": {
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		}
	},
	// under 450px the title will be h3, otherwise it's an h2 styling
	title: {
		margin: "10px 0",
		[theme.breakpoints.down(450)]: theme.typography.h3
	}
}));

export default function StyledContainer({ children, title }) {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Typography className={classes.title} variant="h2" align="center">
				{title}
			</Typography>
			{children}
		</div>
	);
}
