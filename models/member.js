'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      
    }
  };
  Member.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Member',
    paranoid: true,
    timestamps: true
  });
  return Member;
};