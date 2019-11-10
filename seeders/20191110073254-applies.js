'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        let obj = {
          postId: i+1,
          userId: j+1,
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        datas.push(obj)
      }
    }

    return queryInterface.bulkInsert('apply', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('apply', null, {});
  }
};
