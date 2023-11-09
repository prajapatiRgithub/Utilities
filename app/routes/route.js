const express = require('express');
const router = express();

router.use('/', require('./router/userRoute'));
router.use('/', require('./router/financeRoute'));
router.use('/', require('./router/salesRoute'));

module.exports = router;