module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'CashCollection',
    {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      transaction_date: {
        type: Sequelize.TIME(),
        allowNull: false,
      },
      receiving_date: {
        type: Sequelize.TIME(),
        allowNull: false,
      },
      days: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      transaction_initiator: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      received_by: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      from_merchant_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      from_account_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      to_merchant_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      to_account_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      wallet_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      transaction_amount: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
      },
      payment_amount: {
        type: Sequelize.FLOAT(11),
        allowNull: false,
      },
      sales_person: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reference_type: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    },
    { freezeTableName: true, timestamps: false }
  );
};