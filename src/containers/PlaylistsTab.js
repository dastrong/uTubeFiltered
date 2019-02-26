import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Playlists from "../containers/Playlists";
import DialogHolder from "../components/DialogHolder";

const styles = {
  container: {
    padding: 10
  },
  h6: {
    margin: "10px auto",
    maxWidth: 150,
    textAlign: "center"
  }
};

// simple message component
const NoPlaylistsFound = ({ style }) => (
  <Typography className={style} variant="h6">
    No uTubeFiltered Playlists Found
  </Typography>
);

// exported component
const PlaylistsTab = ({ classes, isPlaylistFound }) => (
  <Grid container className={classes.container}>
    {isPlaylistFound ? <Playlists /> : <NoPlaylistsFound style={classes.h6} />}
    <DialogHolder />
  </Grid>
);

PlaylistsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  isPlaylistFound: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isPlaylistFound: Boolean(state.playlists.length)
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(PlaylistsTab);
