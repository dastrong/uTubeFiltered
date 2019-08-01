import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import AsyncSelect from "react-select/async";
import * as SelectComponents from "./ChannelSelects";
import { noOptionsMessage, loadMultiOptions } from "../util/search";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "10px 0"
  },
  input: {
    display: "flex",
    padding: 0
  },
  textField: {
    minHeight: 27,
    padding: "16px 14px"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: "16px 14px",
    minHeight: 19
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  placeholder: {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "inherit",
    position: "absolute",
    left: 14
  },
  paper: {
    position: "absolute",
    zIndex: 10,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const PlaylistForm = ({ classes, token, channels, query, title, ...funcs }) => (
  <form noValidate autoComplete="off" className={classes.root}>
    <FormGroup>
      <TextField
        label="Playlist Title"
        type="text"
        name="title"
        placeholder="What do you want to call this playlist?"
        value={title}
        onChange={funcs.handleInputs("title")}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          classes: {
            input: classes.textField
          }
        }}
      />
      <AsyncSelect
        isMulti
        value={channels}
        classes={classes}
        components={SelectComponents}
        onChange={funcs.handleSelect}
        noOptionsMessage={noOptionsMessage}
        loadOptions={loadMultiOptions(token)}
        placeholder="What channels do you want us to search in?"
        textFieldProps={{
          label: "Channels",
          margin: "normal",
          variant: "outlined",
          InputLabelProps: {
            shrink: true
          }
        }}
      />
      <TextField
        label="Search Query"
        type="text"
        name="query"
        placeholder="What do you want to search?"
        value={query}
        onChange={funcs.handleInputs("query")}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          classes: {
            input: classes.textField
          }
        }}
      />
    </FormGroup>
  </form>
);

PlaylistForm.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleInputs: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(PlaylistForm);
