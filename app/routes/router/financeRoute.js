const express = require('express');
const router = express();
const { addReportController,listOfReportController} = require('../../controller/financeController');
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

module.exports = router;