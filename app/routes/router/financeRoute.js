const express = require('express');
const router = express();
const {
  addReportController,
  listOfReportController,
  truncatedController,
} = require('../../controller/financeController');
const { upload } = require('../../helper/multer');
const { authorization } = require('../../helper/auth');

router.post(
  '/api/finance/uploadSalesReport',
  authorization(['Finance']),
  upload.single('uploadFile'),
  addReportController
);

router.get(
  '/api/finance/listOfSaleDetails',
  authorization(['Finance']),
  listOfReportController
);

router.delete(
  '/api/finance/truncatedReport',
  authorization(['Finance']),
  truncatedController
);

module.exports = router;
