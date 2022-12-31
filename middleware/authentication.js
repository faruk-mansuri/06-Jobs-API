const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_secret);
    // attach user to the job rotes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    // this happen if token is expire
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = auth;
