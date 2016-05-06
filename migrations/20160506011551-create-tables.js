/* jshint node: true */
'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  queryInterface.createTable(
    'temps',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    value: Sequelize.STRING,
  },
  {
    engine: 'MYISAM', // default: 'InnoDB'
    charset: 'latin1' // default: null
  });

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
