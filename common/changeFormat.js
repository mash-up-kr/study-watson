export const changeFormat = given => {
  const day = new Date(given).getDay();
  const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const matches = given.split(/(T)|(\+)/g);
  let hour = matches[3].split(':')[0];
  const minute = matches[3].split(':')[1];
  let isAm = true;

  if (hour > 12) {
    hour -= 12;
    isAm = false;
  }

  const date = `${matches[0].replace(/-/g, '. ')} ${
    weekday[day]
  } ${hour}:${minute} ${isAm ? 'AM' : 'PM'}`;

  return date;
};

export default changeFormat;
