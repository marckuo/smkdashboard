var models  = require('../models');

module.exports = function(sensor_name) {

  switch(sensor_name) {
    case 'temp':
      return models.Temp;
      break;
    case 'humid':
      return models.Humid;
      break;
    case 'door':
      return models.Door;
      break;
    case 'beverage':
      return models.Beverage;
      break;
  }

}
