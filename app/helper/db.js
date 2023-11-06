const Sequelize = require('sequelize');
require('dotenv').config();
const logger = require('../logger/logger');
const message = require('../utils/message');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERS,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    logger.info(message.DATABASE_CONNECTED);
  })
  .catch((err) => {
    logger.error('error', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync(db.sequelize.sync({
    force : false , // To create table if exists , so make it false
    alter : false // To update the table if exists , so make it true
})).then(() => {
  logger.info('yes re-sync');
});

module.exports = db;
