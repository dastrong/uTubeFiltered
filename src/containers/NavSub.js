import React, { Component } from "react";
import PropTypes from "prop-types";
import NavTabs from "../components/NavTabs";
import NavTabContainers from "../components/NavTabContainers";

class NavSub extends Component {
	state = { value: 0 };

	// if user logs out on an active
	// tab push back to info tab
	componentDidUpdate() {
		const { value } = this.state;
		if (!this.props.isAuthenticated) {
			if (!value || value === 4) return;
			this.setState({ value: 0 });
		}
	}

	handleChange = (e, value) => this.setState({ value });

	render() {
		const { value } = this.state;
		const { isAuthenticated } = this.props;
		return (
			<>
				<NavTabs
					value={value}
					handleChange={this.handleChange}
					isAuthenticated={isAuthenticated}
				/>
				<NavTabContainers value={value} />
			</>
		);
	}
}

NavSub.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};

export default NavSub;
