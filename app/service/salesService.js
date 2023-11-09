const db = require('../helper/db');
const message = require('../utils/message');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { update, destroy } = require('../helper/serviceLayer');
const cashCollectionModel = db.cashCollectionModel;

module.exports = {
  updateSalesDetailsReport: async (req, next) => {
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
            `Report's sales ${message.UPDATE_SUCCESS}`,
            undefined,
            StatusCodes.ACCEPTED,
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
          `${message.REQUEST_FAILURE} update report's sales.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },

  deleteSalesDetails: async (req, next) => {
    try {
      const deleteSales = await destroy(
        cashCollectionModel,
        req.params
      );
    
      if (deleteSales > 0) {
        next(
          new GeneralResponse(
            `Report's sales ${message.DELETE_SUCCESS}`,
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
          `${message.REQUEST_FAILURE} delete report's sale.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },
};