import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core/";
import PlaylistsTab from "./PlaylistsTab";
import PlayerTab from "./PlayerTab";
import InfoTab from "../components/InfoTab";
import FaqTab from "../components/FaqTab";
import ExampleTab from "../components/ExampleTab";

const useStyles = makeStyles(theme => ({
	container: {
		paddingTop: 10,
		paddingBottom: 10,
		minHeight: "calc(100vh - 64px - 48px)",
		[theme.breakpoints.down("xs")]: {
			marginBottom: 48,
			padding: "10px 0"
		}
	}
}));

export default function TabContent() {
	const classes = useStyles();
	const value = useSelector(state => state.ui.tabValue);

	return (
		<Container className={classes.container}>
			{value === 0 && <InfoTab />}
			{value === 1 && <PlaylistsTab />}
			{value === 2 && <PlayerTab />}
			{value === 3 && <FaqTab />}
			{value === 4 && <ExampleTab />}
		</Container>
	);
}
