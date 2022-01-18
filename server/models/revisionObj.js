const dateParser = require('../middlewares/dateParser');
const { encrypt, decrypt } = require('../middlewares/crypto');

module.exports = class revisionObj {

  isDate(string) {
    if ((string && string.toString().match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9]{6}/g)) || (string && string instanceof Date && string.getTime())) return true
    else return false
  };

  parseToJS() {
    for (let [key, value] of Object.entries(this)) {
      if (value && !Number.isInteger(value)) {
        try {
          if (this.isDate(value)) {
            this[key] = dateParser.toJS(value);
          }
          else {
            this[key] = decrypt(value)
          };
        }
        catch (error) {
          this[key] = value
        };
      }
    };
    return this
  };

  parseToMySQL() {
    // not null, string = encryption
    for (let [key, value] of Object.entries(this)) {
      if (!Number.isInteger(value) && value !== true && value !== false) {
        try {
          if (this.isDate(value)) {
            this[key] = `"${dateParser.toMySQL(value)}"`;
          }
          else if (value && value.length > 0) {
            this[key] = `"${encrypt(value)}"`
          }
          else {
            this[key] = null
          };
        }
        catch (error) {
          this[key] = value
        };
      }
    };
    return this
  };

  tryJoin(array) {
    try {
      let string = array.join();
      if (string === '') throw error
      else return string
    } catch (error) {
      return null;
    };
  };

  tryParseInt(val) {
    return Number.isInteger(val) ? val : (isNaN(Number.parseInt(val)) ? 0 : Number.parseInt(val));
  };

  isBoolean(val, canBeNull = false) {
    if (canBeNull && val === null) return null;
    else if (val === true || val === false) return val;
    else if (val == 1) return true;
    else return false;
  }
}