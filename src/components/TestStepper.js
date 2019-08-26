import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	MobileStepper
} from "@material-ui/core/";

const useStyles = makeStyles({
	card: {
		width: "100%"
	},
	content: {
		minHeight: "48px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center"
	},
	progress: {
		width: "100%"
	}
});

export default function TextStepper({ dispatch }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const numOfQs = questions.length;
	const activeQ = questions[activeStep];

	function handleSelection(point) {
		dispatch({ type: "Answer_Q", point });
		if (numOfQs - 1 === activeStep) {
			dispatch({ type: "Show_Results" });
			return;
		}
		setActiveStep(state => state + 1);
	}

	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Typography>{activeQ.text}</Typography>
			</CardContent>
			<CardActions>
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={() => handleSelection(activeQ.no)}
				>
					No
				</Button>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={() => handleSelection(activeQ.yes)}
				>
					Yes
				</Button>
			</CardActions>
			<MobileStepper
				classes={{ progress: classes.progress }}
				steps={numOfQs + 1}
				position="static"
				variant="progress"
				activeStep={activeStep}
			/>
		</Card>
	);
}

const questions = [
	{
		text: "Do you go on YouTube often?",
		yes: 5,
		no: -25
	},
	{
		text: "Are you using YouTube while you should be doing something else?",
		yes: 15,
		no: -5
	},
	{
		text: "Would you like to spend less time on YouTube?",
		yes: 10,
		no: -5
	},
	{
		text: "Do you find yourself rewatching videos you’ve already seen again?",
		yes: 3,
		no: -3
	},
	{
		text: "Do you want to avoid seeing YouTube recommended videos?",
		yes: 20,
		no: -5
	}
];
