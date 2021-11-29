'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Organization 1',
          facebook: 'https://www.facebook.com/organization1',
          linkedin: 'https://www.linkedin.com/organization1',
          instagram: 'https://www.instagram.com/organization1',
          image: 'https://www.instagram.com/organization1',
          phone: '+49123456789',
          address: 'Address 1',
          welcomeText: 'Welcome to Organization 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Organization 2',
          facebook: 'https://www.facebook.com/organization2',
          linkedin: 'https://www.linkedin.com/organization2',
          instagram: 'https://www.instagram.com/organization2',
          image: 'https://www.instagram.com/organization2',
          phone: '+49123456789',
          address: 'Address 2',
          welcomeText: 'Welcome to Organization 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {})
  },
}
