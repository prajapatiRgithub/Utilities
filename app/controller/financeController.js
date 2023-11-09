const { addReport, listOfCashCollection } = require('../service/financeService');

module.exports = {
  addReportController: (req, res, next) => {
    return addReport(req, res, next);
  },

  listOfReportController: (req, res, next) => {
    return listOfCashCollection(next);
  },

  updateReportController: (req, res, next) => {
    return updateReport(req, next);
  },
};