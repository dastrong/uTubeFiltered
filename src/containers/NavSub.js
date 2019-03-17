import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavTabs from "../components/NavTabs";
import NavTabContainers from "../components/NavTabContainers";
import { handleTabChange } from "../store/actions/ui";

// uses the tabValue in redux store to display the correct tabs
const NavSub = ({
	isAuthenticated,
	tabValue,
	currentVideoId,
	plUpdAvail,
	handleTabChange,
}) => (
	<>
		<NavTabs
			value={tabValue}
			handleChange={(e, value) => handleTabChange(value)}
			isAuthenticated={isAuthenticated}
			currentVideoId={currentVideoId}
			plUpdAvail={plUpdAvail}
		/>
		<NavTabContainers value={tabValue} />
	</>
);

NavSub.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	tabValue: PropTypes.number.isRequired,
	plUpdAvail: PropTypes.number.isRequired,
	handleTabChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	plUpdAvail: state.ui.playlists.updateAvailCount,
	isAuthenticated: state.currentUser.isAuthenticated,
	tabValue: state.ui.tabValue,
	currentVideoId: state.player.currentVideoId,
});

const mapDispatchToProps = { handleTabChange };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavSub);
