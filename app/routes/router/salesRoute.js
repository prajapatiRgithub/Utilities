const express = require('express');
const router = express();
const { listOfReportController } = require('../../controller/financeController');
const { updateReportController } = require('../../controller/salesController');
const { salesReportValidation } = require('../../validation/saleReportValidation');
const { idValidation } = require('../../validation/idValidation');
const { validator } = require('../../helper/validator');
const { authorization } = require('../../helper/auth');

router.get(
  '/api/sales/listOfSaleDetails',
  authorization(['Sale']),
  listOfReportController
);

router.put(
  '/api/sales/updateSalesReport/:id', 
  authorization(['Sale']),
  validator.params(idValidation),
  validator.body(salesReportValidation),
  updateReportController
);

module.exports = router;