const db = require('../helper/db');
const message = require('../utils/message');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { update } = require('../helper/serviceLayer');
const cashCollectionModel = db.cashCollectionModel;

module.exports = {
    updateReport: async (req, next) => {
    try {
      const updateSaleReport = await update(
        cashCollectionModel,
        req.params,
        req.body
      );
      const [dataValues] = updateSaleReport;

      if (dataValues === 1) {
        next(
          new GeneralResponse(
            `Report ${message.UPDATE_SUCCESS}`,
            undefined,
            StatusCodes.OK,
            RESPONSE_STATUS.SUCCESS
          )
        );
      } else {
        next(
          new GeneralResponse(
            message.DATA_NOT_FOUND,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR
          )
        );
      }
    } catch (err) {
      await t.rollback();
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} update report.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  }
}