// 여기선 인증 관련 권한처리 없이 순수 로직에만 집중!  이후 권한처리는 router에서 미들웨어 추가로 설정
import Joi from "joi"
const { Post, User } = require("../models");

// GET -> 모든 게시물 조회 (+ 최근 등록 순서 페이징 처리)
const findAllPost = async (req, res, next) => {
  try {
      const selectedRows = 2;  // 한 페이지 당 select되는 레코드 갯수
      let pageNum = parseInt(req.params.page, 10); // 요청 페이지 넘버
      if (Number.isNaN(pageNum)) {
          return res.status(400).end();
      }
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

// GET -> post.id로 해당 게시물 조회
const findPost = async (req, res, next) => {
    try {
        const result = await Post.findByPk(req.params.postId);
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

// GET -> 로그인된 사용자가 게시한 게시물 목록 조회
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

// POST -> 게시물 등록
const createPost = async (req, res, next) => {
    try {
        // 작성한 input값 req.body에 저장 후 db에 insert하기
        const { title, workingDate, workingTime, pay, address, dueDate, description, category } = req.body;

        // 중복된 제목 validation
        const posts = await Post.findAll();
        const isConflict = posts.filter(post => post.title===title).length;
        if (isConflict) {
            return res.status(409).end();
        }

        // joi 패키지를 이용한 input값 validation
        const schema = {
            title : Joi.string().required(),
            workingDate : Joi.string().required(),
            workingTime : Joi.string().required(),
            pay : Joi.string().required(),
            address : Joi.string().required(),
            dueDate : Joi.string().required(),
            description : Joi.string().required(),
            category: Joi.string()
        };
        const joiResult = Joi.validate(req.body, schema);
        if (joiResult.error) {
            // 400 Bad Request
            return res.status(400).send(joiResult.error.details[0].message);
        }

        const result = Post.create({
            //userId : req.user.id,
            userId : 2,
            title : title,
            workingDate : workingDate,
            workingTime : workingTime,
            pay : pay,
            address : address,
            dueDate : dueDate,
            description : description,
            category: category
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT -> post.id로 해당 게시물 수정
const modifyPost = async (req, res, next) => {
    try {
        const { title, workingDate, workingTime, pay, address, dueDate, description } = req.body;

        // 여기서 update함수는 업데이트된 레코드의 갯수를 리턴한다. 그래서 result는 1
        await Post.update({
            title : title,
            workingDate : workingDate,
            workingTime : workingTime,
            pay : pay,
            address : address,
            dueDate : dueDate,
            description : description
        }, {
            where : { id : req.params.postId}
        });
        const updatedPost = await Post.findOne({where: { title: title }});
        res.status(201).json(updatedPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE -> post.id로 해당 게시물 삭제
const deletePost = async (req, res, next) => {
    try {
        const result = await Post.destroy({ where : { id : req.params.postId }});
        res.status(201).json(`${result}명의 회원정보가 성공적으로 삭제되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export { findAllPost, createPost, findPost, modifyPost, deletePost, findPostByUserId }