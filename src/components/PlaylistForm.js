import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormGroup, TextField } from "@material-ui/core";
import AsyncSelect from "react-select/async";
import * as SelectComponents from "./ChannelSelects";
import { noOptionsMessage, loadMultiOptions } from "../util/search";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "10px 0"
  },
  input: {
    display: "flex",
    padding: 0,
    height: "inherit"
  },
  textField: {
    minHeight: 36,
    padding: "16px 14px"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: "16px 14px",
    minHeight: 36
  },
  chip: {
    margin: `${theme.spacing(0.25)}px ${theme.spacing(0.25)}px`
  },
  avatar: {
    margin: 10
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(0.5)}px`,
    textAlign: "center"
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
    marginTop: -5,
    left: 5,
    right: 5,
    boxShadow: "-0.1px -0.1px 0.9px rgba(0,0,0,0.5)"
  },
  divider: {
    height: `${theme.spacing(2)}px`
  }
}));

export default function PlaylistForm(props) {
  const { channels, query, title, token, formPatch, storePatch } = props;
  const classes = useStyles();
  const maxChannelsReached = channels.length < 3;

  return (
    <form noValidate autoComplete="off" className={classes.root}>
      <FormGroup>
        <TextField
          label="Playlist Title"
          type="text"
          placeholder="ex) NBA Highlights"
          helperText="Between 4-15 characters"
          value={title}
          onChange={e => formPatch({ type: "Title", title: e.target.value })}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{ classes: { input: classes.textField } }}
        />
        <AsyncSelect
          isMulti
          isSearchable={maxChannelsReached}
          value={channels}
          classes={classes}
          components={SelectComponents}
          onChange={arr => formPatch({ type: "Channels", channels: arr || [] })}
          noOptionsMessage={inputValue =>
            noOptionsMessage(inputValue, maxChannelsReached)
          }
          loadOptions={loadMultiOptions(token, storePatch)}
          placeholder="ex) ESPN, NBA on ESPN"
          textFieldProps={{
            label: "Channels",
            margin: "normal",
            variant: "outlined",
            InputLabelProps: { shrink: true },
            helperText: "1-3 channels allowed"
          }}
        />
        <TextField
          label="Search Query"
          type="text"
          placeholder="ex) nba highlights"
          helperText="Between 4-20 characters"
          value={query}
          onChange={e => formPatch({ type: "Query", query: e.target.value })}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{ classes: { input: classes.textField } }}
        />
      </FormGroup>
    </form>
  );
}

PlaylistForm.propTypes = {
  channels: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  formPatch: PropTypes.func.isRequired,
  storePatch: PropTypes.func.isRequired
};
