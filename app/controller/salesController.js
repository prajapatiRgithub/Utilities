const { updateReport } = require('../service/salesService');

module.exports = {
  updateReportController: (req, res, next) => {
    return updateReport(req, next);
  },
};