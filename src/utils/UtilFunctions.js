export const getTimestamp = (tzformat) => {
  const newDate = new Date(tzformat);
  const now = new Date();
  const timeDifference = now - newDate;

  const Years = now.getFullYear() - newDate.getFullYear();
  const Months = now.getMonth() - newDate.getMonth() + Years * 12;
  const Days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const Hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const Minutes = Math.floor(timeDifference / (1000 * 60));

  if (Years >= 1) {
    return `${Years} year${Years > 1 ? "s" : ""} ago`;
  } else if (Months >= 1) {
    return `${Months} month${Months > 1 ? "s" : ""} ago`;
  } else if (Days >= 1) {
    return `${Days} day${Days > 1 ? "s" : ""} ago`;
  } else if (Hours >= 1) {
    return `${Hours} hour${Hours > 1 ? "s" : ""} ago`;
  } else {
    return `${Minutes} minute${Minutes > 1 ? "s" : ""} ago`;
  }
};

export const closePopup = () => {
  document.getElementById("pop-up-error").style.display = "none";
};
