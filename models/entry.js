'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Categoy, { as: 'category' });
    }
  }
  Entry.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Entry',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deletedAt',
      paranoid: true,
      timestamps: true,
    }
  );
  return Entry;
};
