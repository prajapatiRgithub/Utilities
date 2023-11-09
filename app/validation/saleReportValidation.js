const Joi = require("joi");

module.exports = {
  salesReportValidation: Joi.object().keys({
    transaction_id: Joi.string().optional().allow("").messages({
      "string.base": "Transaction id should be a type of string",
    }),
    transaction_date: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .optional()
      .allow("")
      .messages({
        "string.base": `Transaction date & time format not valid`,
      }),
    receiving_date:Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .optional()
    .allow("")
    .messages({
      "string.base": `Receiving date & time format not valid`,
    }),
    days: Joi.number().optional().allow("").messages({
      "number.base": "Days should be a type of number",
    }),
    transaction_initiator: Joi.string().optional().allow("").messages({
      "string.base": "transaction initiator should be a type of string",
    }),
    received_by: Joi.string().optional().allow("").messages({
      "string.base": "Received by should be a type of string",
    }),
    from_merchant_id: Joi.string().optional().allow("").messages({
      "string.base": "From merchant id should be a type of string",
    }),
    from_account_name: Joi.string().optional().allow("").messages({
      "string.base": "From account name should be a type of string",
    }),
    to_merchant_id: Joi.string().optional().allow("").messages({
      "string.base": "To merchant id should be a type of string",
    }),
    to_account_name: Joi.string().optional().allow("").messages({
      "string.base": "To account name should be a type of string",
    }),
    wallet_type: Joi.string().optional().allow("").messages({
      "string.base": "Wallet type should be a type of string",
    }),
    transaction_amount: Joi.number().optional().allow("").messages({
      "string.base": "Transaction amount should be a type of string",
    }),
    payment_amount: Joi.number().optional().allow("").messages({
      "string.base": "Payment amount should be a type of string",
    }),
    sales_person: Joi.string().optional().allow("").messages({
      "string.base": "Sales person should be a type of string",
    }),
    reference_type: Joi.string().optional().allow("").messages({
      "string.base": "Reference type should be a type of string",
    }),
    comment: Joi.string().optional().allow("").messages({
      "string.base": "Comment should be a type of string",
    }),
  }),
};
