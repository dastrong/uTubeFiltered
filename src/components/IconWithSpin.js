import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// adds a spinner around Icon
// children should be an icon to wrap around
// adds position absolute, so spinner wraps over the icon
const IconWithSpin = ({ children, spin, value, color }) => (
	<>
		{children}
		{spin && (
			<CircularProgress
				variant={
					value === undefined || value <= 20 ? "indeterminate" : "static"
				}
				value={value}
				style={{ position: "absolute" }}
				color={color ? color : "primary"}
			/>
		)}
	</>
);

export default IconWithSpin;
