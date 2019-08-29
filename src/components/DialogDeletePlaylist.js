import React from "react";
import { Dialog, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DialogBasicInner from "./DialogBasicInner";

export default function DialogDeletePlaylist(props) {
	const { open, negFunc, posFunc } = props;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={negFunc}
			aria-labelledby="delete-playlist-title"
			aria-describedby="delete-playlist-text"
		>
			<DialogBasicInner
				name="delete-playlist"
				title="Are you sure you want to delete this playlist?"
				msg="There's no undoing this..."
				negText="Nvm, take me back."
				posText="Yes, I'm sure."
				negFunc={negFunc}
				posFunc={posFunc}
			/>
		</Dialog>
	);
}
