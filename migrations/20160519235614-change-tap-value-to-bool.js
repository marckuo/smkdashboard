module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Taps',
      'value',
      Sequelize.BOOLEAN
    );
    // logic for transforming into the new state
  },

  down: function(queryInterface, Sequelize) {

  }
}
