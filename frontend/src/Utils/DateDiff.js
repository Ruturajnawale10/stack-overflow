const DateDiff = {
  inDays: function (d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  },

  inMonths: function (d1, d2) {
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return d2M - d1M;
  },

  inYears: function (d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
  },
};

export const getDateDiff = (startDate) => {
  let currDate = new Date(Date.now());
  let yearsDiff = DateDiff.inYears(startDate, currDate);
  let monthsDiff = DateDiff.inMonths(startDate, currDate);
  let daysDiff = DateDiff.inDays(startDate, currDate);
  let diffDate = "";
  if (yearsDiff === 0) {
    if (monthsDiff === 0) {
      diffDate += daysDiff + " days";
    } else {
      diffDate += monthsDiff + " months";
    }
  } else {
    if (monthsDiff === 0) {
      diffDate += yearsDiff + " years ago";
    } else if (monthsDiff > 0) {
      diffDate += yearsDiff + " years, " + monthsDiff + " months";
    } else {
      diffDate += yearsDiff - 1 + " years, " + (monthsDiff + 12) + " months";
    }
  }
  return diffDate;
};
