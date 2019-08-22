import React, { useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tabs, Tab, Paper, Badge, useMediaQuery } from "@material-ui/core/";
import TvIcon from "@material-ui/icons/LiveTv";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import SubsIcon from "@material-ui/icons/Subscriptions";
import PlaylistIcon from "@material-ui/icons/PlaylistPlay";
import ToolTip from "../components/ToolTip";
import usePlUpdateNotifier from "../hooks/usePlUpdateNotifier";
import { setTab } from "../store/actions/ui";

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

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

	const _handleChange = useCallback((e, value) => dispatch(setTab(value)), [
		dispatch
	]);

	return (
		<Paper square className={isMobile ? classes.root : ""}>
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
					<SubsIcon />
				</TabWithToolTip>
				<Tab className={classes.tabs} icon={<HelpIcon />} />
			</Tabs>
		</Paper>
	);
}
