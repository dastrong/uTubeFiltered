import React from "react";
import App from "../App";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadClient, initClient } from "../util/gabi";
import { authUser } from "../store/actions/auth";
import { connect } from "react-redux";

// loads youtube client and updates UI when it's ready
class Client extends React.Component {
	state = {
		isClientLoaded: false,
	};

	componentDidMount() {
		loadClient(initClient.bind(this));
	}

	render() {
		return this.state.isClientLoaded ? (
			<App />
		) : (
			<div
				style={{
					height: "100vh",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
				}}
			>
				<CircularProgress />
			</div>
		);
	}
}

const mapDispatchToProps = { authUser };

export default connect(
	null,
	mapDispatchToProps
)(Client);
