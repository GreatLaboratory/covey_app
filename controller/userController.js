const { User } = require("../models");
const Joi = require("joi");

// GET
const findAllUser = async (req, res, next) => {
    try {
        const result = await User.findAll();
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const findUser = async (req, res, next) => {
    try {
        const result = await User.findOne({
            where : { id : req.user.id }
        });
        if (!result) {
            res.status(404).json({ message : "Not Found"});
            return;
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT
const addUserInfo = async (req, res, next) => {
  try {
      // joi 패키지를 이용한 input값 validation과정
      const schema = {
          address : Joi.string().min(3).required(),
          age : Joi.required(),
          career : Joi.string().min(3).required(),
          nickname : Joi.string().min(3).required(),
          gender : Joi.string().min(3).required(),
          univ : Joi.string().min(3).required(),
      };
      const joiResult = Joi.validate(req.body, schema);
      if (joiResult.error) {
          // 400 Bad Request
          res.status(400).send(joiResult.error.details[0].message);
          return;
      }

      const { address, age, career, nickname, gender, univ } = req.body;
      const result = await User.update({
          address : address,
          age : age,
          career : career,
          nickname : nickname,
          gender : gender,
          univ : univ
      }, {
          //where : { id : req.user.id }
          where : { id : 1 }
      });
      res.status(201).json(`${result}명의 회원정보가 성공적으로 추가되었습니다.`);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

const modifyUser = async (req, res, next) => {
    try {
        const { address, age, career, nickname, gender, univ } = req.body;

        // 여기서 update함수는 업데이트된 레코드의 갯수를 리턴한다. 그래서 result는 1
        const result = await User.update({
            address : address,
            age : age,
            career : career,
            nickname : nickname,
            gender : gender,
            univ : univ
        }, {
            //where : { id : req.user.id }
            where : { id : 1 }
        });

        res.status(201).json(`${result}명의 회원정보가 성공적으로 수정되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE
const deleteUser = async (req, res, next) => {
  try {
      const result = await User.destroy({ where : { id : req.user.id }});
      res.status(201).json(`${result}명의 회원정보가 성공적으로 삭제되었습니다.`);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

export { findAllUser, addUserInfo, findUser, modifyUser, deleteUser }