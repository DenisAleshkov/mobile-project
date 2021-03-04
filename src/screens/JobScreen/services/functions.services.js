export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'p' : 'm';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const getFormatDate = (value) => {
  const date = new Date(value);
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const currentDate = date.getDate();
  const year = date.getFullYear().toString().replace(20, '');
  return `${month}/${currentDate}/${year}  ${formatAMPM(date)}`;
};
