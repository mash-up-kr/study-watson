export const changeFormat = (startAt, studyingTime) => {
  const day = new Date(startAt).getDay();
  const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const matches = startAt.split(/(T)|(\+)/g);
  let hour = matches[3].split(':')[0];
  const minute = matches[3].split(':')[1];
  let isAm = true;

  if (hour > 12) {
    hour -= 12;
    isAm = false;
  }

  let date = `${matches[0].replace(/-/g, '. ')} ${
    weekday[day]
    } ${hour}:${minute}`;

  if (studyingTime) {
    const endTime = studyingTime.split(':');
    const endHour = parseInt(hour, 10) + parseInt(endTime[0], 10);
    const endMinute = parseInt(minute, 10) + parseInt(endTime[1], 10);

    date += ` ~ ${endHour < 10 ? `${endHour}` : endHour}:${
      endMinute < 10 ? `0${endMinute}` : endMinute
      }`;
  }

  date += ` ${isAm ? 'AM' : 'PM'}`;

  return date;
};

export default changeFormat;
