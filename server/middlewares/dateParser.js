// Assuming we work with MySQL datetime

exports.toJS = (datetime = new Date.getDate()) => {
  if (datetime.prototype.toString.call(obj) === "[object Date]") {
    return datetime
  }
  else {
    // Split MySQL datetime into [ Y, M, D, h, m, s ]
    let t = datetime.split(/[- :]/);
    // Apply each element to the Date function
    return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]))
  }
};

exports.toMySQL = (datetime = new Date.getDate()) => {
  if (datetime.prototype.toString.call(obj) === "[object Date]") {
    return datetime.toISOString().slice(0, 19).replace('T', ' ')
  }
  else {
    return datetime
  }
};