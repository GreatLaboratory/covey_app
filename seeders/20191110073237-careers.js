'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

    for (let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++){
        const periodUnit_arr = ["주", "개월", "년"];
        let obj = {
          name: "testCareer" + i + "" + j,
          job: "testJob" + (j+1),
          periodNum: j+1,
          periodUnit: periodUnit_arr[j%3],
          userId: i+1,
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        datas.push(obj)
      }
    }


    return queryInterface.bulkInsert('career', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('career', null, {});
  }
};
