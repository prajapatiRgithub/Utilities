const db = require('../helper/db');
const message = require('../utils/message');
const { GeneralError } = require('../utils/error');
const { GeneralResponse } = require('../utils/response');
const { StatusCodes } = require('http-status-codes');
const { RESPONSE_STATUS } = require('../utils/enum');
const { bulkCreate, findAll, destroy } = require('../helper/serviceLayer');
const cashCollectionModel = db.cashCollectionModel;
const XLSX = require('xlsx');

module.exports = {
  addReport: async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      if (req.file == undefined) {
        next(
          new GeneralResponse(
            message.REQUIRED_FILE,
            undefined,
            StatusCodes.NOT_FOUND,
            RESPONSE_STATUS.ERROR
          )
        );
      }

      const path = req.file.path;
      var workbook1 = XLSX.readFile(path);
      var sheetName = 'Sheet1'; // Change to the name of your specific sheet

      var sheet = workbook1.Sheets[sheetName];

      let finalData = [];
      let startRow = 10;
      const headers = [
        'Transaction ID',
        'Transaction Date',
        'Receiving Date',
        'Age(in Days)',
        'Transaction Initiator',
        'Received By',
        'From Merchant ID',
        'From Account Name',
        'To Merchant ID',
        'To Account Name',
        'Wallet Type',
        'Transaction Amount',
        'Payment Amount',
        'Salesperson',
        'Reference Type',
        'Comment',
      ];

      let lastIndex = null;
      let updatedStr = null;
      for (let rowNum = startRow; ; rowNum++) {
        const row = XLSX.utils.encode_row(rowNum);
        if (!sheet[`A${row}`]) {
          lastIndex = Object.keys(sheet)[Object.keys(sheet).length - 7]; //for last index number;

          for (let i in sheet) {
            if (sheet[i].v === 'Transaction ID') {
              let letterPart = i.match(/[A-Za-z]+/)[0];
              let numberPart = parseInt(i.match(/\d+/)[0]);

              numberPart++;

              updatedStr = letterPart + numberPart;
            }
          }
          break;
        }
      }

      let importRange = `${updatedStr}:${lastIndex}`;
      const item = XLSX.utils.sheet_to_json(sheet, {
        header: headers,
        range: importRange,
      });

      let uniqueTransactions = {};
      let uniqueArray = [];

      //Remove duplicate Transaction ID.
      for (const transaction of item) {
        const transactionId = transaction['Transaction ID'];
        if (!uniqueTransactions[transactionId]) {
          uniqueArray.push(transaction);
          uniqueTransactions[transactionId] = true;
        }
      }

      for (let key of uniqueArray) {
        const obj = {
          transaction_id: key['Transaction ID'],
          transaction_date: key['Transaction Date'],
          receiving_date: key['Receiving Date'],
          days: key['Age(in Days)'],
          transaction_initiator: key['Transaction Initiator'],
          received_by: key['Received By'],
          from_merchant_id: key['From Merchant ID'],
          from_account_name: key['From Account Name'],
          to_merchant_id: key['To Merchant ID'],
          to_account_name: key['To Account Name'],
          wallet_type: key['Wallet Type'],
          transaction_amount: key['Transaction Amount'],
          payment_amount: key['Payment Amount'],
          sales_person: key['Salesperson'],
          reference_type: key['Reference Type'],
          comment: key['Comment'] ? key['Comment'] : null,
        };
        finalData.push(obj);
      }

      if (finalData && finalData.length > 0) {
        await bulkCreate(cashCollectionModel, finalData, t);
        await t.commit();
        next(
          new GeneralResponse(
            `Report ${message.ADD_DATA}`,
            finalData,
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
          `${message.REQUEST_FAILURE} add report.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },

  listOfCashCollection: async (next) => {
    try {
      const viewReport = await findAll(cashCollectionModel);
      if (viewReport && viewReport.length > 0) {
        next(
          new GeneralResponse(
            `Report ${message.ADD_DATA}`,
            viewReport,
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
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} view report.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  },

  truncatedReports: async (next) => {
    try {
      const deleteSales = await destroy(
        cashCollectionModel,
        {}
      );
    
      if (deleteSales > 0) {
        next(
          new GeneralResponse(
            `Report ${message.TRUNCATED}`,
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
      console.log('dfd',err);
      next(
        new GeneralError(
          `${message.REQUEST_FAILURE} delete report.`,
          undefined,
          err?.original?.sqlMessage ? err.original.sqlMessage : undefined,
          RESPONSE_STATUS.ERROR
        )
      );
    }
  }
};