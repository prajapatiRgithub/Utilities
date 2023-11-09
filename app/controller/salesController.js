const { updateSalesDetailsReport, deleteSalesDetails } = require('../service/salesService');

module.exports = {
  updateReportController: (req, res, next) => {
    return updateSalesDetailsReport(req, next);
  },

  deleteReportController: (req, res, next) => {
    return deleteSalesDetails(req, next);
  },
};