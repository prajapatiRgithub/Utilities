const express = require('express');
const router = express();
const { registerController, loginController } = require('../../controller/userController');
const { validator } = require('../../helper/validator');
const { registerValidation, loginValidation } = require('../../validation/userValidation');

router.post(
  '/api/user/registration',
  validator.body(registerValidation),
  registerController
);

router.post('/api/user/login',
 validator.body(loginValidation),
 loginController
);

module.exports = router;
