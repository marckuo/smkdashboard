module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
    'Members',
    'signedIn',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
    );
    // logic for transforming into the new state
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn('Members', 'signedIn');
  }
}
