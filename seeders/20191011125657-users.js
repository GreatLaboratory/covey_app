'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for(let i = 0; i < 10; i++){
      const address2_arr = ["강남구", "송파구", "강동구", "종로구", "중랑구"];
      let obj = {
        snsId: "145489721156",
        name: "testUser" + (i+1),
        gender: true,
        age: (i+20) + '',
        address1: "서울특별시",
        address2: address2_arr[i%5],
        phoneNum: '01092988726',
        intro: "hi hello world",
        img: 'sadf546s5df46as8df56sad4f65',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      };
      datas.push(obj)
    }

    return queryInterface.bulkInsert('user', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
