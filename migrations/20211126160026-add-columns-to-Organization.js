'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'image', Sequelize.STRING)
    await queryInterface.addColumn('Organizations', 'phone', Sequelize.STRING)
    await queryInterface.addColumn('Organizations', 'address', Sequelize.STRING)
    await queryInterface.addColumn(
      'Organizations',
      'welcomeText',
      Sequelize.TEXT,
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'image')
    await queryInterface.removeColumn('Organizations', 'phone')
    await queryInterface.removeColumn('Organizations', 'address')
    await queryInterface.removeColumn('Organizations', 'welcomeText')
  },
}
