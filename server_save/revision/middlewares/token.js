const jwt = require('jsonwebtoken');

module.exports = (token) => {
  return jwt.verify(token, 'b$UKq/Tjy9lCriz$$YUUTXCMo.obIcG/AO4')
};