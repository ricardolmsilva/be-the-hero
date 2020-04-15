const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.id = decoded.id;
  return next();
};
