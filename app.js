const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('./app/helper/db');

const cors = require('cors');
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running.. :${port}`);
});
