// Assuming we work with MySQL datetime

exports.toJS = (datetime = new Date()) => {
  // Split MySQL datetime into [ Y, M, D, h, m, s ]
  let t = datetime.split(/[- :]/);
  // Apply each element to the Date function
  return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
};

exports.toMySQL = (datetime = new Date()) => {
  datetime = new Date(datetime);
  return new Date(
    datetime.getFullYear(),
    datetime.getMonth(),
    datetime.getDate(),
    datetime.getHours(),
    datetime.getMinutes(),
    datetime.getSeconds(),
  ).toISOString().slice(0, 19).replace('T', ' ')
};