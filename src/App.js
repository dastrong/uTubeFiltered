import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "./containers/NavBar";
import NavSub from "./containers/NavSub";

const App = ({ user, isAuthenticated }) => (
	<>
		<NavBar user={user} isAuthenticated={isAuthenticated} />
		<NavSub isAuthenticated={isAuthenticated} />
	</>
);

const mapStateToProps = state => {
	return {
		user: state.currentUser.user,
		isAuthenticated: state.currentUser.isAuthenticated,
	};
};

App.propTypes = {
	user: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
