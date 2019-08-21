import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// adds a spinner around Icon
// children should be an icon to wrap around
// adds position absolute, so spinner wraps over the icon
const IconWithSpin = ({ spin, children }) => (
  <>
    {children}
    {spin && <CircularProgress style={{ position: "absolute" }} />}
  </>
);

export default IconWithSpin;
