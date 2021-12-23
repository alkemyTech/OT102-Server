'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Slides', [
    {
     imageUrl: 'https://i.ibb.co/b5pRxTd/alkemy1.jpg',
     text: 'Somos Mas',
     order: 1,
     organizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      imageUrl: 'https://i.ibb.co/5hkvWK3/alkemy2.jpg',
      text: 'Somos Mas',
      order: 2,
      organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      imageUrl: 'https://i.ibb.co/wLZWvgq/alkemy3.jpg',
      text: 'Somos Mas',
      order: 3,
      organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Slides', null, {});
    
  }
};
