import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Paper, Badge } from "@material-ui/core/";
import InfoIcon from "@material-ui/icons/Info";
import PlaylistIcon from "@material-ui/icons/PlaylistPlay";
import TvIcon from "@material-ui/icons/LiveTv";
import HelpIcon from "@material-ui/icons/Help";
import LightIcon from "@material-ui/icons/WbIncandescent";
import ToolTip from "../components/ToolTip";
import usePlUpdateNotifier from "../hooks/usePlUpdateNotifier";
import { setTab } from "../store/actions/ui";

const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down("xs")]: {
			position: "fixed",
			bottom: 0,
			width: "100%",
			zIndex: 111
		},
		"& .MuiSvgIcon-root": {
			verticalAlign: "middle"
		}
	},
	tabs: {
		flex: "auto",
		maxWidth: 150,
		minWidth: 60,
		textAlign: "center"
	},
	lightbulb: {
		transform: "rotate(180deg)"
	}
}));

const TabWithToolTip = ({ className, title, disabled, children, ...rest }) => (
	<Tab
		{...rest}
		className={className}
		style={{ pointerEvents: "auto" }}
		disabled={disabled}
		label={<ToolTip title={title}>{children}</ToolTip>}
	/>
);

const getState = state => ({
	value: state.ui.tabValue,
	playlists: state.playlists,
	updateAvailCount: state.ui.updateAvailCount,
	isAuthenticated: state.currentUser.isAuthenticated,
	isPlayerActive: !!state.ids.playlist.playing
});

export default function TabBar() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {
		value,
		playlists,
		isAuthenticated,
		isPlayerActive,
		updateAvailCount
	} = useSelector(getState, shallowEqual);
	// automatically updates our updated available badge
	usePlUpdateNotifier(playlists);

	const _handleChange = useCallback((e, value) => dispatch(setTab(value)), [
		dispatch
	]);

	return (
		<Paper square className={classes.root}>
			<Tabs
				value={value}
				onChange={_handleChange}
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
						badgeContent={updateAvailCount}
						invisible={!updateAvailCount}
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
					<LightIcon className={classes.lightbulb} />
				</TabWithToolTip>
				<Tab className={classes.tabs} icon={<HelpIcon />} />
			</Tabs>
		</Paper>
	);
}
