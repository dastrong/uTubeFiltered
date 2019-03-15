import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForeverRounded";
import PlayIcon from "@material-ui/icons/PlayArrow";

const opa8 = { opacity: 0.8 };

const styles = {
  item: { padding: 5 },
  card: {
    boxShadow: "0 0 1px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 1,
    transition: "opacity 0.34s",
    "&:hover": opa8,
    "&:hover $playIcon": opa8
  },
  clicker: {
    cursor: "pointer",
    display: "flex",
    padding: 0,
    alignItems: "center",
    position: "relative"
  },
  image: { width: 120 },
  content: {
    width: "100%",
    padding: "10px 5px 10px 15px!important"
  },
  text: {
    overflow: "hidden",
    maxHeight: 70,
    fontSize: "0.75rem"
  },
  playIcon: {
    width: 120,
    height: 70,
    position: "absolute",
    opacity: 0,
    transition: "opacity 0.34s"
  },
  icon: {
    borderRadius: 0,
    width: 60,
    alignSelf: "stretch"
  },
  active: opa8
};

const PlayerListItem = ({
  classes,
  title,
  thumbnail,
  deleteItem,
  isPlaying,
  playItem
}) => {
  const active = isPlaying ? classes.active : "";
  return (
    <Grid
      className={`${isPlaying ? "active-item" : ""} ${classes.item}`}
      item
      xs={12}
    >
      <Card className={`${classes.card} ${active}`}>
        <CardContent onClick={playItem} className={classes.clicker}>
          <CardMedia
            component="img"
            alt="playlist thumbnail"
            className={classes.image}
            image={thumbnail}
            title={title}
          />
          <PlayIcon
            className={`${classes.playIcon} ${active}`}
            color="primary"
          />

          <CardContent className={classes.content}>
            <Typography className={classes.text} variant="body2">
              {title}
            </Typography>
          </CardContent>
        </CardContent>

        <IconButton
          className={classes.icon}
          aria-label="Delete"
          onClick={deleteItem}
        >
          <DeleteIcon />
        </IconButton>
      </Card>
    </Grid>
  );
};

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playItem: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayerListItem);
