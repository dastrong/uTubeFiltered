import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadClient } from "../util/gabi";
import App from "../components/App";

const loaderStyles = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute"
};

// loads youtube client and updates UI when it's ready
export default function Client() {
  const dispatch = useDispatch();
  const isClientLoaded = useSelector(state => state.ui.isClientLoaded);

  useEffect(() => {
    loadClient(dispatch);
  }, [dispatch]);

  return isClientLoaded ? (
    <App />
  ) : (
    <div style={loaderStyles}>
      <CircularProgress />
    </div>
  );
}
