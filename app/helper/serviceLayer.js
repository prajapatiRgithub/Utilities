module.exports = {
  create: async (collection, insertData) => {
    return collection.create(insertData);
  },

  bulkCreate: async (collection, insertData) => {
    return collection.bulkCreate(insertData);
  },

  findOne: async (collection, condition, selectAttribute) => {
    return collection.findOne({
      attributes: selectAttribute,
      where: condition,
    });
  },

  update: async (collection, condition, selectAttribute) => {
    return collection.update(selectAttribute, {
      where: condition,
    });
  },

  destroy: async (collection, condition) => {
    return collection.destroy({
      where: condition,
    });
  },

  findAll: async (collection, condition, selectAttribute) => {
    return collection.findAll({
      attributes: selectAttribute,
      where: condition,
    });
  },
};
