import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadClient, initClient } from "../util/gabi";
import { authUser } from "../store/actions/auth";
import { handleClient } from "../store/actions/ui";
import App from "../App";

// loads youtube client and updates UI when it's ready
class Client extends Component {
  componentDidMount() {
    loadClient(initClient.bind(this));
  }

  render() {
    return this.props.isClientLoaded ? (
      <App />
    ) : (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute"
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}

Client.propTypes = {
  authUser: PropTypes.func.isRequired,
  handleClient: PropTypes.func.isRequired,
  isClientLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isClientLoaded: state.ui.isClientLoaded
});

const mapDispatchToProps = {
  authUser,
  handleClient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
