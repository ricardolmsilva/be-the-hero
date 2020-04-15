const bcrypt = require('bcrypt');

module.exports = async function hashPassword(password) {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const hashedPassword = await bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};
