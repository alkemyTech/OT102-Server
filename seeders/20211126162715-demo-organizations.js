'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Somos Mas',
          facebook: 'https://www.facebook.com/organization1',
          linkedin: 'https://www.linkedin.com/organization1',
          instagram: 'https://www.instagram.com/organization1',
          image: 'https://i.ibb.co/mq82s1g/logo-somos-mas.png',
          phone: '+49123456789',
          address: 'Carranza 1962',
          welcomeText: 'Bienvenidos a Somos Mas!, nuestro principal objetivo es promover la inclusión social de los sectores más vulnerables de la Argentina',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {})
  },
}
