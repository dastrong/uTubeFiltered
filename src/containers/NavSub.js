import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavTabs from "../components/NavTabs";
import NavTabContainers from "../components/NavTabContainers";
import { handleTabChange } from "../store/actions/ui";

// uses the tabValue in redux store to display the correct tabs
class NavSub extends Component {
  // if user logs out on an active
  // tab push back to info tab
  componentDidUpdate() {
    const value = this.props.tabValue;
    if (!this.props.isAuthenticated) {
      if (!value || value === 4) return;
      this.props.handleTabChange(value);
    }
  }

  handleChange = (e, value) => this.props.handleTabChange(value);

  render() {
    const { isAuthenticated, tabValue } = this.props;
    return (
      <>
        <NavTabs
          value={tabValue}
          handleChange={this.handleChange}
          isAuthenticated={isAuthenticated}
        />
        <NavTabContainers value={tabValue} />
      </>
    );
  }
}

NavSub.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  tabValue: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.currentUser.isAuthenticated,
  tabValue: state.ui.tabValue
});

const mapDispatchToProps = {
  handleTabChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavSub);
