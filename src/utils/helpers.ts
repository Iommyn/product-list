import md5 from 'md5';

export const createAuthData = () => {
  const date = new Date();

  const year = String(date.getFullYear());
  let month = String(date.getMonth());
  let day = String(date.getDate());

  if (month.length === 1) {
    month = `0${Number(month) + 1}`;
  }

  if (day.length === 1) {
    day = `0${day}`;
  }
  return md5(`Valantis_${year}${month}${day}`);
};
