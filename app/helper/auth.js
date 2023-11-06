const jwt = require('jsonwebtoken');
const { GeneralError } = require('../utils/error');
const { RESPONSE_STATUS } = require('../utils/enum');
const message = require('../utils/message');
const { StatusCodes } = require('http-status-codes');
const logger = require('../logger/logger');
// Middleware for Generating a new JWT Token
const generateToken = (data) => {
  return jwt.sign({ id: data.id, role: data.role}, process.env.PRIVATEKEY, {
    expiresIn: '365d',
  });
};

// Middleware for authorization a JWT Token
const authorization = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        logger.error(message.AUTH_MISSING);
        next(
          new GeneralError(
            message.AUTH_MISSING,
            undefined,
            StatusCodes.UNAUTHORIZED,
            RESPONSE_STATUS.ERROR
          )
        );
      }

      const verified = jwt.verify(token, process.env.PRIVATEKEY);
      req.user = verified;
      if (roles.length > 0 && roles.some((role) => role === verified.role)) {
        next();
      } else {
        logger.error(message.ACCESS_REQUIRED);
        next(
          new GeneralError(
            message.ACCESS_REQUIRED,
            undefined,
            StatusCodes.UNAUTHORIZED,
            RESPONSE_STATUS.ERROR
          )
        );
      }
    } catch (err) {
      let errorResponse =
        err.name === 'TokenExpiredError'
          ? message.TOKEN_EXPIRED
          : err.name === 'JsonWebTokenError'
          ? message.TOKEN_INVALID
          : `${message.REQUEST_FAILURE} authorization.`;

    logger.error(message.errorResponse);
      next(
        new GeneralError(
            errorResponse,
          undefined,
          undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  };
};

module.exports = {
  generateToken,
  authorization,
};