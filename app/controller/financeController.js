const { addReport, listOfCashCollection, truncatedReports } = require('../service/financeService');

module.exports = {
  addReportController: (req, res, next) => {
    return addReport(req, res, next);
  },

  listOfReportController: (req, res, next) => {
    return listOfCashCollection(next);
  },

  truncatedController: (req, res, next) => {
    return truncatedReports(next);
  },
};