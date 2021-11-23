'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Contacts', [{
       name: 'John Doe',
       phone: 1151111111,
       email: 'test@test.com',
       message: 'Contacto desde la web',
       createdAt: new Date,
       updatedAt: new Date
     },
     {
      name: 'Juan Lopez',
      phone: 2252222222,
      email: 'test@gmail.com',
      message: 'Contacto desde la web',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Contacts', null, {});
  }
};
