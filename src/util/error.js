import { setQuota } from "../store/actions/ui";
import { getRefreshDateString } from "./dateQuota";

// https://developers.google.com/youtube/v3/docs/errors
export function handleError(dispatch, { code, errors, message }) {
  console.log(message);
  // 400 code errors get a simple snackbar notificationn
  if (code !== 403) return;
  // check if the error was due to the app quota being reached
  const quotaRelatedReasons = ["dailyLimitExceeded", "quotaExceeded"];
  const isQuotaFull = quotaRelatedReasons.includes(errors[0].reason);
  if (!isQuotaFull) return;
  const refreshDate = getRefreshDateString();
  const quotaInfo = { isQuotaFull: true, refreshDate };
  localStorage.setItem("quotaInfo", JSON.stringify(quotaInfo));
  dispatch(setQuota(true));
}
