'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activity.init({
    name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
    },
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Activity',
    createdAt: 'createdAt',
    updatedAt: 'updated_at',
    deletedAt: 'deletedAt',
    paranoid: true,
    timestamps: true
    
  });
  return Activity;
};
