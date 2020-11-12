export const calcTime = (isoTime) => {
  const time = Math.floor((new Date() - new Date(isoTime)) / 1000);
  const minute = time > 60 ? Math.floor(time / 60) : undefined;
  const hour = minute > 60 ? Math.floor(minute / 60) : undefined;
  const day = hour > 24 ? Math.floor(hour / 24) : undefined;
  if (day) {
    return day + ' day ago';
  } else if (hour) {
    return hour + ' hours ago';
  } else if (minute) {
    return minute + ' minutes ago';
  }
  return time + ' seconds ago';
};
