'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasOne(models.User, { foreignKey: 'roleId' })
    }
  };
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Role',
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt', 
    deletedAt: 'deletedAt', 
    paranoid: true, 
    timestamps: true
  });
  return Role;
};