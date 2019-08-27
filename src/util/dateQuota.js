// DST === Daylight Savings Time
// PST === Pacific Savings Time - YouTube uses this time
export function getRefreshDateString() {
  // current local date
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();
  const curDateNum = curDate.getDate();
  const curHours = curDate.getHours();

  // get the first and last day of this year's DST
  const { firstDay, lastDay } = getDSTdays(curYear);

  // is DST currently happening
  const isDST = firstDay < curDate && curDate < lastDay;

  // offsets in hours
  const timeZoneOffsetPST = isDST ? -7 : -8;
  const timeZoneOffsetUser = curDate.getTimezoneOffset() / -60;

  // determines if the user is ahead or behind PST time
  const TZdiff = timeZoneOffsetUser - timeZoneOffsetPST;

  // get the user's hour that equal to midnight PST
  const targetHr = (24 + TZdiff) % 24;

  // checks if the target time will be today or tomorrow and get the target date
  const addADay = targetHr === 0 || curHours >= targetHr ? 1 : 0;
  const targetDateNum = curDateNum + addADay;

  // created local date string where => local time === midnight PST
  // add 10 mins on the end to account for inaccurate quota refreshes
  const refreshDate = new Date(curYear, curMonth, targetDateNum, targetHr, 10);

  return refreshDate;
}

function getDSTdays(year) {
  // get FIRST day of March and November
  const dateStart = new Date(year, 2);
  const dateEnd = new Date(year, 10);

  dateStart.setHours(2);
  dateEnd.setHours(2);

  // get the SECOND Sunday of March
  const firstDay = getSunday(dateStart, 8);
  // get the FIRST Sunday of November
  const lastDay = getSunday(dateEnd, 1);

  return { firstDay, lastDay };
}

// returns a date string corresponding to the next Sunday
function getSunday(date, start) {
  for (let i = start; i < start + 7; i++) {
    date.setDate(i);
    if (date.getDay() === 0) return date;
  }
}
