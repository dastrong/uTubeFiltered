import React, { useReducer } from "react";
import { Typography, Button, Container } from "@material-ui/core";
import StyledContainer from "./StyledContainer";
import TestStepper from "./TestStepper";

const initialState = { showTest: false, showResults: false, points: 25 };

const reducer = (state, action) => {
	const { type, point } = action;
	switch (type) {
		case "Show_Test":
			return { ...initialState, showTest: true };
		case "Show_Results":
			return { ...state, showTest: false, showResults: true };
		case "Answer_Q":
			return { ...state, points: state.points + point };
		default:
			return state;
	}
};

export default function InfoTab() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { showTest, showResults, points } = state;

	if (showTest) return <Test dispatch={dispatch} />;

	if (showResults) return <Results dispatch={dispatch} points={points} />;

	return <Welcome dispatch={dispatch} />;
}

const Test = ({ dispatch }) => (
	<StyledContainer title="Our Test">
		<Container maxWidth="sm">
			<TestStepper dispatch={dispatch} />
		</Container>
	</StyledContainer>
);

const Results = ({ dispatch, points }) => {
	const result = getResult(points);
	return (
		<StyledContainer title="Your Results">
			<Container maxWidth="md">
				<Typography style={{ padding: "16px 0" }} align="center">
					{result}
				</Typography>
				<Button onClick={() => dispatch({ type: "Show_Test" })}>
					Take the test again?
				</Button>
			</Container>
		</StyledContainer>
	);
};

const Welcome = ({ dispatch }) => (
	<StyledContainer title="Welcome">
		<Container maxWidth="md" style={{ paddingTop: "16px" }}>
			<Typography align="center" variant="h6" gutterBottom>
				Do you want to improve your productivity?
			</Typography>
			<Typography align="center" variant="h6" gutterBottom>
				Take our test to see if we can help!
			</Typography>
			<Button
				color="primary"
				size="large"
				onClick={() => dispatch({ type: "Show_Test" })}
			>
				Start Now
			</Button>
			<Typography
				style={{ marginTop: "0.35em" }}
				align="center"
				variant="caption"
			>
				Note: You don't need to take the test
			</Typography>
		</Container>
	</StyledContainer>
);

function getResult(points) {
	if (points < 11) {
		return "We’re one productivity tool you don’t need.";
	} else if (points < 21) {
		return "You probably don’t need to use us.";
	} else if (points < 31) {
		return "Hmm, we couldn’t decide. Try it out for yourself and see.";
	} else if (points < 41) {
		return "It seems like you would benefit from using us.";
	} else {
		return "You definitely should use uTubeFiltered.";
	}
}
