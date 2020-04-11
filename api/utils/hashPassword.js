const bcrypt = require("bcrypt");

module.exports = function hashPassword(password) {
  const saltRounds = 4;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  return hashedPassword;
};
