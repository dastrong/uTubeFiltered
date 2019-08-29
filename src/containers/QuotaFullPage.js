import React from "react";
import { useDispatch } from "react-redux";
import Countdown, { zeroPad } from "react-countdown-now";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { setQuota } from "../store/actions/ui";

const useStyles = makeStyles({
  holder: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    "& > div > *": {
      marginBottom: 10,
      textAlign: "center"
    }
  }
});

const CountdownText = ({ hours, minutes, seconds }) =>
  `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;

export default function QuotaFullPage() {
  const { holder } = useStyles();
  const dispatch = useDispatch();

  const refreshDate = localStorage.quotaInfo
    ? JSON.parse(localStorage.getItem("quotaInfo")).refreshDate
    : "";

  function quotaReached() {
    localStorage.removeItem("quotaInfo");
    dispatch(setQuota(false));
  }

  return (
    <div className={holder}>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1">
          {process.env.REACT_APP_SITE_NAME}
        </Typography>

        <Typography variant="h5" component="h2">
          YouTube Quota Limit Reached
        </Typography>

        <Typography variant="body2" component="h3">
          We'll be available again when the quota refreshes in:
        </Typography>

        <Typography variant="h2" component="h4" color="secondary">
          <Countdown
            date={refreshDate}
            zeroPadTime={0}
            renderer={CountdownText}
            onComplete={quotaReached}
          />
        </Typography>
      </Container>
    </div>
  );
}
