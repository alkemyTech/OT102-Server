'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [
    {
      name: 'John Doe',
      image: 'https://www.economia360.org/wp-content/uploads/2021/04/Director-Adjunto-600x300.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Maria Diaz',
      image: 'https://www.adlatina.com/uploads/img/200121073001_arnal650.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Miguel Lopez',
      image: 'https://cdn-1.motorsport.com/images/amp/0JBn5wO0/s1000/michael-masi-fia-1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  }
};
