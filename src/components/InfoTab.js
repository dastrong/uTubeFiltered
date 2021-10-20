import React, { useReducer } from "react";
import { Typography, Button, Container } from "@material-ui/core";
import StyledContainer from "./StyledContainer";
import TestStepper from "./TestStepper";

const saveResults = (result) => localStorage.setItem("testResults", result);

const init = () => {
  let testResults = localStorage.testResults;
  if (!testResults)
    return {
      headerText: "Your",
      showTest: false,
      showResults: false,
      points: 25
    };
  return {
    headerText: "Past",
    showTest: false,
    showResults: true,
    points: Number(testResults)
  };
};

const initialState = init();

const reducer = (state, action) => {
  const { type, point } = action;
  switch (type) {
    case "Show_Test":
      return { ...state, showTest: true };
    case "Show_Results": {
      saveResults(state.points);
      return {
        ...state,
        showTest: false,
        showResults: true,
        headerText: "Your"
      };
    }
    case "Answer_Q":
      return { ...state, points: state.points + point };
    case "Reset_Test":
      return {
        showResults: false,
        showTest: true,
        points: 25,
        headerText: "Your"
      };
    default:
      return state;
  }
};

export default function InfoTab() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { headerText, showTest, showResults, points } = state;

  if (showTest) return <Test dispatch={dispatch} />;

  if (showResults)
    return (
      <Results dispatch={dispatch} points={points} headerText={headerText} />
    );

  return <Welcome dispatch={dispatch} />;
}

const Test = ({ dispatch }) => (
  <StyledContainer title="Our Test">
    <Container maxWidth="sm">
      <TestStepper dispatch={dispatch} />
    </Container>
  </StyledContainer>
);

const Results = ({ dispatch, points, headerText }) => {
  const result = getResult(points);
  return (
    <StyledContainer title={`${headerText} Result`}>
      <Container maxWidth="md">
        <Typography style={{ padding: "16px 0" }} align="center">
          {result}
        </Typography>
        <Button onClick={() => dispatch({ type: "Reset_Test" })}>
          Take the test again?
        </Button>
      </Container>
    </StyledContainer>
  );
};

const Welcome = ({ dispatch }) => (
  <StyledContainer title="Welcome">
    <Container maxWidth="md" style={{ paddingTop: "16px" }}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 675.67 631.95"
        style={{ maxWidth: 400, minWidth: 200, width: "50%" }}
      >
        <path
          d="m624.6 483.46 30.3 4.73a98.99 98.99 0 0 0 20.6-42.93c-22.16 18.14-55.86 8.5-82.74 18.4a59.54 59.54 0 0 0-35.62 37.35l-14.81 15.93a99.77 99.77 0 0 0 83.41-4.59 96.37 96.37 0 0 0 19.64-14.1c-10.6-6.68-20.79-14.8-20.79-14.8Z"
          fill="#f2f2f2"
        />
        <path
          d="m613.83 434.98 29.24-9.28a98.99 98.99 0 0 0-.7-47.62c-11.75 26.12-46.22 32.53-65.86 53.38a59.54 59.54 0 0 0-15.22 49.3l-6.15 20.88a99.77 99.77 0 0 0 72.6-41.31 96.37 96.37 0 0 0 11.3-21.38c-12.48-1.25-25.2-3.97-25.2-3.97Z"
          fill="#f2f2f2"
        />
        <path
          d="M675.67 526.6a1.19 1.19 0 0 1-1.19 1.19H1.19a1.19 1.19 0 0 1 0-2.38h673.29a1.19 1.19 0 0 1 1.19 1.19Z"
          fill="#ccc"
        />
        <circle cx="279" cy="260.87" r="215" fill="#e6e6e6" />
        <path
          d="M464 260.87a184.74 184.74 0 0 1-74.67 148.5 156.21 156.21 0 0 1-4.72 3.4 185.03 185.03 0 0 1-211.22 0c-1.6-1.1-3.17-2.23-4.72-3.4a185.02 185.02 0 0 1 0-297.01c1.55-1.16 3.13-2.3 4.72-3.4a185.03 185.03 0 0 1 211.22 0c1.59 1.1 3.17 2.24 4.72 3.4A184.74 184.74 0 0 1 464 260.86Z"
          fill="#fff"
        />
        <circle cx="279" cy="260.87" r="169" fill="#6c63ff" />
        <path
          d="M279.44 92.34c-2.56 0-5.11.07-7.64.18a169 169 0 0 1-7.16 337.17c4.88.42 9.81.65 14.8.65a169 169 0 0 0 0-338Z"
          opacity=".2"
        />
        <path
          d="M279.5 79.87a5.51 5.51 0 0 0-5.5 5.5v24a5.5 5.5 0 0 0 11 0v-24a5.51 5.51 0 0 0-5.5-5.5ZM389.33 112.36a156.21 156.21 0 0 0-4.72-3.4 5.5 5.5 0 0 0-4.9 2.4l-13.51 19.83a5.5 5.5 0 0 0 9.09 6.19l13.5-19.83a5.46 5.46 0 0 0 .54-5.2ZM450.7 202.78a5.5 5.5 0 0 0-7.15-3.02l-22.24 9.03a5.5 5.5 0 0 0 4.14 10.19l22.24-9.03a5.51 5.51 0 0 0 3.02-7.17ZM191.8 131.19l-13.51-19.83a5.5 5.5 0 0 0-4.9-2.4c-1.6 1.1-3.17 2.24-4.72 3.4a5.46 5.46 0 0 0 .53 5.19l13.5 19.83a5.5 5.5 0 0 0 9.1-6.2ZM136.69 208.79l-22.24-9.03a5.5 5.5 0 0 0-4.14 10.19l22.24 9.03a5.5 5.5 0 0 0 4.14-10.2ZM279.5 406.87a5.51 5.51 0 0 0-5.5 5.5v24a5.5 5.5 0 0 0 11 0v-24a5.51 5.51 0 0 0-5.5-5.5ZM388.8 404.19l-13.51-19.83a5.5 5.5 0 1 0-9.1 6.19l13.52 19.83a5.5 5.5 0 0 0 4.9 2.39c1.59-1.1 3.17-2.23 4.72-3.4a5.46 5.46 0 0 0-.53-5.18ZM447.69 311.79l-22.24-9.03a5.5 5.5 0 0 0-4.14 10.19l22.24 9.03a5.5 5.5 0 0 0 4.14-10.2ZM190.35 382.9a5.5 5.5 0 0 0-7.64 1.46l-13.51 19.83a5.46 5.46 0 0 0-.53 5.19c1.55 1.16 3.13 2.29 4.72 3.39a5.5 5.5 0 0 0 4.9-2.4l13.5-19.82a5.5 5.5 0 0 0-1.44-7.64ZM139.7 305.78a5.5 5.5 0 0 0-7.15-3.02l-22.24 9.03a5.5 5.5 0 0 0 4.14 10.19l22.24-9.03a5.51 5.51 0 0 0 3.02-7.17Z"
          fill="#fff"
        />
        <path
          d="M286.63 258.14a11.51 11.51 0 0 1-9.4 13.26l-97.6 16.6a11.5 11.5 0 0 1-3.86-22.67l97.6-16.6a11.51 11.51 0 0 1 13.26 9.4Z"
          fill="#3f3d56"
        />
        <path
          d="M389.35 366.27a7.5 7.5 0 0 1-10.6.04L273.68 262.07a7.5 7.5 0 0 1 10.57-10.65L389.3 355.66a7.5 7.5 0 0 1 .04 10.6Z"
          fill="#3f3d56"
        />
        <circle cx="279" cy="260.87" r="13" fill="#ccc" />
        <path
          d="M189.45 35.44c-19.95 31.38-50.4 52.2-87.95 65.88a7.06 7.06 0 0 1-9.88-1.42c-20.4-27.24-15.79-66.16 11.13-86.97a62.07 62.07 0 0 1 87.56 11.88l.56.75a7.06 7.06 0 0 1-1.42 9.88ZM367.69 24.81a62.07 62.07 0 0 1 87.56-11.88c26.91 20.81 31.52 59.73 11.12 86.97a7.06 7.06 0 0 1-9.88 1.42c-34.86-13.35-63.44-36.44-87.95-65.88a7.06 7.06 0 0 1-1.42-9.88ZM358.94 447.13a5.51 5.51 0 0 0-2.11 7.49l31.74 56.72a5.5 5.5 0 0 0 9.6-5.37l-31.74-56.72a5.51 5.51 0 0 0-7.49-2.12ZM191.57 449.25l-31.74 56.72a5.5 5.5 0 0 0 9.6 5.37l31.74-56.72a5.5 5.5 0 1 0-9.6-5.37Z"
          fill="#e6e6e6"
        />
        <circle cx="395" cy="508.87" r="17" fill="#e6e6e6" />
        <circle cx="407" cy="73.87" r="17" fill="#e6e6e6" />
        <circle cx="278" cy="33.87" r="17" fill="#e6e6e6" />
        <circle cx="155" cy="71.87" r="17" fill="#e6e6e6" />
        <circle cx="166" cy="508.87" r="17" fill="#e6e6e6" />
        <path
          d="M381.66 356.7a8.52 8.52 0 0 0 12.95 1.68l26.68 14.3-1.43-15.66-25.11-11.18a8.56 8.56 0 0 0-13.09 10.87Z"
          fill="#ffb7b7"
        />
        <path
          d="m401.1 362.17 10.45-14.43 50.36 23.8 62.67-11.75a21.47 21.47 0 0 1 25.43 21.06 21.5 21.5 0 0 1-21.43 21.51l-71.82.14Z"
          fill="#3f3d56"
        />
        <path
          fill="#ffb7b7"
          d="m385 611.4-10.58-5.06 14.53-44.21 15.61 7.47L385 611.4zM455.9 604.27a230.58 230.58 0 0 1-6.98 4.23l-2.36 1.37v.02h-.05l-.01.01-1.2.3-1.72-4.54-.79-2.09-1.12-2.96-2.05-5.41-10.8-28.51 16.8-4.14.62 2.57.32 1.27 5.86 23.79 1.2 4.86.04.15.72 2.9.62 2.52.7 2.82Z"
        />
        <path
          d="M556.05 504.15c-1.06 1.7-2.15 3.4-3.24 5.1q-3.06 4.7-6.27 9.27l-.02.01a21.93 21.93 0 0 1-4.12 3.01c-.06.05-.13.08-.19.12a15.18 15.18 0 0 1-3.47 1.39l-1.3.32a87.63 87.63 0 0 1-12.85 2.03l-.65.06c-11.12.81-21.94-.5-33.24-2.65a555.48 555.48 0 0 1-17.17-3.64l-5.81-1.29-.46-.1a647 647 0 0 0-8.56-1.82c-3.66-.75-7.45-1.48-11.38-2.17l.28 5.54a41.69 41.69 0 0 0 2.63 12.45c1.68 4.91 3 8.8.2 16.88l-1.35 3.92a13.37 13.37 0 0 1-1.38 11.83l-.27.41 11.27 28.52.73 1.85h-24.9l-17.37-34.83-.83-1.66v-.09l1.8-66.94c.02-.59.07-1.19.14-1.78a20.35 20.35 0 0 1 7.75-13.7 19.6 19.6 0 0 1 14.6-4l5.94.77 12.14 1.57 8.56 1.11.17.03 25.22 3.26 1.81-7.38.34-.12 10.62-3.9 36.73-13.46.1-.03 2.4-.89.3.47.24.42a72 72 0 0 1 5.8 13.47 211.48 211.48 0 0 1 6.1 23.28q.1.52.2.94l.01.08.05.24c.85 3.53.26 7.83-1.3 12.1Z"
          fill="#2f2e41"
        />
        <path
          d="M557.6 479.48c-.11-.5-.26-1-.42-1.5a106.29 106.29 0 0 0-4.3-10.89 175.68 175.68 0 0 0-6.65-13.05q-1.9-3.4-4.09-7.08-1.1-1.84-2.27-3.75a1.97 1.97 0 0 0-.1-.17l-.23-.37-36.34 4.86-13.53 1.81-.81 6.75-.2 1.67-.54 4.56-.72 6.02-.06-.01-20.09-2.6-20.7-2.68-11.11-1.44a19.59 19.59 0 0 0-14.6 4 20.36 20.36 0 0 0-7.74 13.7c-.07.54-.12 1.1-.14 1.65l-10.49 24.85a160.34 160.34 0 0 0-11.86 46.65l-7.69 24.58 1.1.1 16.3 1.52 4.3.4 9.48-13.83c1.08-1.58 2.1-3.2 3.06-4.87a73.86 73.86 0 0 0 4.19-8.42l20.5-48.78 4.7.77q10.79 1.75 20.7 2.85c21.5 2.4 40.11 2.6 56.68.56q6.98-.86 13.5-2.24 2.39-.5 4.71-1.08c.37-.09.73-.17 1.08-.27a19.83 19.83 0 0 0 13.87-12.95 20.23 20.23 0 0 0 .51-11.32ZM388.38 604.18l-11.45-5.48-1.8-.87-2.86 7.04-20 4.4a4.75 4.75 0 0 0-.79 9.04l19.56 7.98 6.2-5.59-1.52 7.5 7.37 3 8.07-25.68ZM458.7 593.34l.73 1.85h-.73v-1.85zM454.72 595.58l-12 4.16-1.87.65 2.91 7.02-11.12 17.2a4.75 4.75 0 0 0 5.8 6.97l19.51-8.08.48-8.34 4.2 6.4 7.35-3.05-12.35-23.93Z"
          fill="#2f2e41"
        />
        <path
          d="M554.61 490.73a4.4 4.4 0 0 1-2.04-.5l-63.27-33.07-.73-2.99-1.38-9.47.02-.1 6.01-27.73c-.1-.24-.34-.63-.6-1.07-2.68-4.56-10.86-18.41 4.74-37.48l27.4-31.94 23.51-1.02.27.34a61.24 61.24 0 0 1 10.41 56.89l-2.45 44.22 2.63 8.93a24.64 24.64 0 0 1-.72 15.94l.6 14.46a4.42 4.42 0 0 1-4.4 4.6Z"
          fill="#3f3d56"
        />
        <path
          d="M499.73 527.2a8.52 8.52 0 0 0 2.12-12.89l15.22-26.16-15.7.89-12.04 24.7a8.56 8.56 0 0 0 10.4 13.46Z"
          fill="#ffb7b7"
        />
        <path
          d="m505.87 507.96-14.06-10.95 25.54-49.5-9.57-63.04a21.47 21.47 0 0 1 21.94-24.68 21.5 21.5 0 0 1 20.75 22.17l-2.37 71.78Z"
          fill="#3f3d56"
        />
        <path
          data-name="a1ca5f83-7fa1-45b1-9d3b-bf096f25c0e5"
          d="M509.68 333.1v-23.26a31.18 31.18 0 1 1 62.35-.04v.04c5.5 11.45 2.06 16.9 0 23.26a4.2 4.2 0 0 1-4.18 4.19h-53.98a4.2 4.2 0 0 1-4.2-4.19Z"
          fill="#2f2e41"
        />
        <circle cx="530.63" cy="312.44" r="23.34" fill="#ffb7b7" />
        <path
          d="m555.06 318.56-.64-.11c-3.64-.65-7.28-1.28-10.9-1.94l-.34-8.23-4.4 7.37c-10.03 3.33-19.41 1.45-28.24-2.7a79.74 79.74 0 0 1-8.46-4.67 30.93 30.93 0 0 1 15.2-21.88c.33-.2.65-.36.98-.53a.01.01 0 0 0 .01 0c.57-.27 1.15-.53 1.73-.76a25.7 25.7 0 0 1 26.98 5.23c7.13 6.8 10.34 18.03 8.08 28.22Z"
          fill="#2f2e41"
        />
      </svg>
      <Typography
        align="center"
        variant="h5"
        gutterBottom
        style={{ marginTop: 16 }}
      >
        Do you want to improve your productivity?
      </Typography>
      <Typography
        align="center"
        variant="h6"
        gutterBottom
        style={{ color: "rgba(0 0 0 0.6)" }}
      >
        Take our test to see if we can help!
      </Typography>
      <Typography align="center" variant="caption">
        Note: You don't need to take the test
      </Typography>
      <Button
        color="primary"
        size="large"
        onClick={() => dispatch({ type: "Show_Test" })}
      >
        Start Now
      </Button>
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
