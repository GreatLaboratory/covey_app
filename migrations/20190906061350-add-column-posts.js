'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'category', {
      type: Sequelize.ENUM,
      values: ["CAFE", "RESTAURANT", "ETC"]
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'category')
  }
};
