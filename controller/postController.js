import Joi from "joi"
const { Post, User } = require("../models");

// GET
const findAllPost = async (req, res, next) => {
  try {
      const selectedRows = 2;  // 한 페이지 당 select되는 레코드 갯수
      let pageNum = req.params.page; // 요청 페이지 넘버
      let offset = 0;
      if(pageNum > 1){
          offset = selectedRows * (pageNum - 1);
      }
      const result = await Post.findAll({
          offset : offset,
          limit : selectedRows,   // 일단 한 페이지에 10개 로우씩 select하자
          order : [["id", "DESC"]]  // 최근 등록 순으로 정렬
      });
      res.json(result);
  }  catch (err) {
      console.error(err);
      next(err);
  }
};

const findPost = async (req, res, next) => {
    try {
        const result = await Post.findByPk(req.params.id);
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

const findPostByUserId = async (req, res, next) => {
  try {
      // const user = await User.findOne({ where: { id : req.user.id } });
      const user = await User.findOne({ where: { id : 3 } });
      const posts = await user.getPosts();
      res.json(posts);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

// POST
const createPost = async (req, res, next) => {
    try {
        // joi 패키지를 이용한 input값 validation과정
        const schema = {
            title : Joi.string().required(),
            workingDate : Joi.string().required(),
            workingTime : Joi.string().required(),
            pay : Joi.string().required(),
            address : Joi.string().required(),
            dueDate : Joi.string().required(),
            description : Joi.string().required()
        };
        const joiResult = Joi.validate(req.body, schema);
        if (joiResult.error) {
            // 400 Bad Request
            res.status(400).send(joiResult.error.details[0].message);
            return;
        }

        // 작성한 input값 req.body에 저장 후 db에 insert하기
        const { title, workingDate, workingTime, pay, address, dueDate, description } = req.body;
        const result = await Post.create({
            //userId : req.user.id,
            userId : 2,
            title : title,
            workingDate : workingDate,
            workingTime : workingTime,
            pay : pay,
            address : address,
            dueDate : dueDate,
            description : description
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT
const modifyPost = async (req, res, next) => {
    try {
        const { title, workingDate, workingTime, pay, address, dueDate, description } = req.body;

        // 여기서 update함수는 업데이트된 레코드의 갯수를 리턴한다. 그래서 result는 1
        const result = await Post.update({
            title : title,
            workingDate : workingDate,
            workingTime : workingTime,
            pay : pay,
            address : address,
            dueDate : dueDate,
            description : description
        }, {
            where : { id : req.params.id}
        });

        res.status(201).json(`${result}명의 회원정보가 성공적으로 수정되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE
const deletePost = async (req, res, next) => {
    try {
        const result = await Post.destroy({ where : { id : req.params.id }});
        res.status(201).json(`${result}명의 회원정보가 성공적으로 삭제되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export { findAllPost, createPost, findPost, modifyPost, deletePost, findPostByUserId }