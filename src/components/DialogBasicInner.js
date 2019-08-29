import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core/";

export default function DialogBasicInner(props) {
  const { name, title, msg, negText, posText, negFunc, posFunc } = props;
  return (
    <>
      <DialogTitle id={name + "-title"}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={name + "-msg"}>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={negFunc} color="primary">
          {negText}
        </Button>
        <Button
          size="large"
          onClick={posFunc}
          color="secondary"
          variant="outlined"
          autoFocus
        >
          {posText}
        </Button>
      </DialogActions>
    </>
  );
}

DialogBasicInner.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  negText: PropTypes.string.isRequired,
  posText: PropTypes.string.isRequired,
  negFunc: PropTypes.func.isRequired,
  posFunc: PropTypes.func.isRequired
};
