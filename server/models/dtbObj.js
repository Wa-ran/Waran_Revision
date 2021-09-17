const dtb = require('../middlewares/dtb');
const dateParser = require('../middlewares/dateParser');
const { encrypt, decrypt } = require('../middlewares/crypto');

module.exports = class dtbObj {

  parseToJS() {
    for (let [key, value] of Object.entries(this)) {
      if (value && !Number.isInteger(value)) {
        try {
          if (value && value.toString().match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9].[0-9]{6}/g)) {
            this[key] = dateParser.toJS(value);
          }
          else {
            this[key] = decrypt(value)
          };
        }
        catch (error) {
          console.log([key, value])
          throw error
        };
      }
    };
    return this
  };

  parseToMySQL() {
    // not null, string = encryption
    for (let [key, value] of Object.entries(this)) {
      if (value && !Number.isInteger(value)) {
        try {
          if (value && value instanceof Date && value.getTime()) {
            this[key] = `"${dateParser.toMySQL(value)}"`;
          }
          // else if (value === null) {
          //   this[key] = '""'
          // }
          else if (value !== true && value !== false) {
            this[key] = `"${encrypt(value)}"`
          };
        }
        catch (error) {
          console.log([key, value])
          throw error
        };
      }
    };
    return this
  };

  tryJoin(array) {
    try {
      return array.join();
    } catch (error) {
      return null;
    };
  };

  tryParseInt(val) {
    return Number.isInteger(val) ? val : (isNaN(Number.parseInt(val)) ? null : Number.parseInt(val));
  };
}