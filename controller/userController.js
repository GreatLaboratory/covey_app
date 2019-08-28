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

// POST
const createUser = async (req, res, next) => {
  try {
      // joi 패키지를 이용한 input값 validation과정
      const schema = {
        name : Joi.string().min(3).required(),
        email : Joi.string().min(3).required()
      };
      const joiResult = Joi.validate(req.body, schema);
      if (joiResult.error) {
          // 400 Bad Request
          res.status(400).send(joiResult.error.details[0].message);
          return;
      }

      // db에 작성한 input값 insert하기
      const { name, email } = req.body;
      const result = await User.create({
          name : name,
          email : email
      });
      res.status(201).json(result);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

// PUT
const modifyUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // 여기서 update함수는 업데이트된 레코드의 갯수를 리턴한다. 그래서 result는 1
        const result = await User.update({
            name : name,
            email : email
        }, {
            where : { id : req.user.id }
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

export { findAllUser, createUser, findUser, modifyUser, deleteUser }
