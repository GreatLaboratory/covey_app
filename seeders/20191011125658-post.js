'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

    for (let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        const category_arr = ["식당", "카페", "술집", "편의점", "잡화매장", "독서실", "PC방", "기타"];
        const address2_arr = ["강남구", "송파구", "강동구", "종로구", "중랑구"];
        let obj = {
          userId: i+1,
          title: "testPost" + i + "" + j,
          startDate: "2019-10-01",
          endDate: "2019-10-15",
          dueDate: "2019-09-25",
          isDue: 0,
          workingTime: "11:00 ~ 20:00",
          address1: "서울특별시",
          address2: address2_arr[j%5],
          address3: "미사강변대로 165",
          pay: 8500 + (1000*j),
          description: "testDesc" + (j+1),
          category: category_arr[j%8],
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        datas.push(obj)
      }
    }

    return queryInterface.bulkInsert('post', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
  }
};
