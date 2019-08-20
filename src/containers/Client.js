import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import App from "../components/App";
import QuotaFullPage from "../components/QuotaFullPage";
import { loadClient } from "../util/gabi";

const loaderStyles = {
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute"
};

const getState = state => ({
  isClientLoaded: state.ui.isClientLoaded,
  isQuotaFull: state.ui.isQuotaFull
});

// loads youtube client and updates UI when it's ready
export default function Client() {
  const dispatch = useDispatch();
  const state = useSelector(getState);
  const { isClientLoaded, isQuotaFull } = state;

  useEffect(() => {
    loadClient(dispatch);
  }, [dispatch]);

  return isQuotaFull ? (
    <QuotaFullPage />
  ) : isClientLoaded ? (
    <App />
  ) : (
    <div style={loaderStyles}>
      <CircularProgress />
    </div>
  );
}
