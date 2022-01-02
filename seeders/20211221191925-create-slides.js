'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Slides', [
    {
     imageUrl: 'https://i.ibb.co/y4nDFTz/slide-1.jpg',
     text: 'Somos Mas',
     order: 1,
     organizationId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      imageUrl: 'https://i.ibb.co/mqrZXPw/slide-2.jpg',
      text: 'Somos Mas',
      order: 2,
      organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      imageUrl: 'https://i.ibb.co/RBJnJ1V/slide-3.jpg',
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
