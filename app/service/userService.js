const bcrypt = require('bcrypt');
const db = require('../helper/db');
const message = require('../utils/message');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../helper/auth');
const { RESPONSE_STATUS } = require('../utils/enum');
const { findOne, create } = require('../helper/serviceLayer');
const usersModel = db.authUserModel;
const saltRounds = 10;

module.exports = {
  register: async (req, next) => {
    const t = await db.sequelize.transaction();
    try {
      let { email_id, password } = req.body;

      const findUser = await findOne(usersModel, { email_id });

      if (!findUser) {
        req.body.password = await bcrypt.hash(password, saltRounds);
        const registerUser = await create(usersModel, req.body, t);

        if (registerUser && Object.keys(registerUser).length > 0) {
          await t.commit();
          next(
            new GeneralResponse(
              message.REGISTER_SUCCESS,
              undefined,
              StatusCodes.OK,
              RESPONSE_STATUS.SUCCESS
            )
          );
        } else {
          next(
            new GeneralResponse(
              message.USER_NOT_FOUND,
              undefined,
              StatusCodes.NOT_FOUND,
              RESPONSE_STATUS.ERROR
            )
          );
        }
      } else {
        next(
          new GeneralResponse(
            message.ALREADY_EXIST,
            undefined,
            StatusCodes.BAD_REQUEST,
            RESPONSE_STATUS.ERROR
          )
        );
      }
    } catch (err) {
      await t.rollback();
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} registration.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },

  login: async (req, next) => {
    try {
      const { email_id, password } = req.body;

      const findUser = await findOne(usersModel, { email_id });

      if (!findUser) {
        next(
          new GeneralResponse(
            message.USER_NOT_FOUND,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR
          )
        );
      }
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (comparePassword && Object.keys(findUser).length > 0) {
        let tokenObj = {
          id: findUser.id,
          role: findUser.role,
        };

        const token = generateToken(tokenObj);

        next(
          new GeneralResponse(
            message.LOGIN_SUCCESS,
            {token},
            StatusCodes.OK,
            RESPONSE_STATUS.SUCCESS
          )
        );
      } else {
        next(
          new GeneralResponse(
            message.INCORRECT_CREDENTIALS,
            undefined,
            StatusCodes.BAD_REQUEST,
            RESPONSE_STATUS.ERROR
          )
        );
      }
    } catch (err) {
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} login.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },
};