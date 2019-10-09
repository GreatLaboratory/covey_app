// 여기선 인증 관련 권한처리 없이 순수 로직에만 집중!  이후 권한처리는 router에서 미들웨어 추가로 설정
import Joi from "joi"
const { Post, User } = require("../models");

// GET -> 모든 게시물 조회 (+ 최근 등록 순서 페이징 처리)
const findAllPost = async (req, res, next) => {
  try {
      const { pay, address, category, filterStartDate, filterEndDate } = req.query;
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
          limit : selectedRows,
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
        const { title, startDate, endDate, dueDate, address1, address2, address3, pay, description, category, img1, img2, img3 } = req.body;

        // 중복된 제목 validation
        const posts = await Post.findAll();
        const isConflict = posts.filter(post => post.title===title).length;
        if (isConflict) {
            return res.status(409).end();
        }

        // joi 패키지를 이용한 input값 validation
        const schema = {
            title : Joi.string().required(),
            startDate : Joi.string().required(),
            endDate : Joi.string().required(),
            dueDate : Joi.string().required(),
            address1 : Joi.string().required(),
            address2 : Joi.string().required(),
            address3 : Joi.string().required(),
            pay : Joi.required(),
            description : Joi.string().required(),
            category : Joi.string().required(),
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
            startDate : startDate,
            endDate : endDate,
            dueDate : dueDate,
            address1 : address1,
            address2 : address2,
            address3 : address3,
            pay : pay,
            description : description,
            category : category,
            img1 : img1,
            img2 : img2,
            img3 : img3,
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
        const { title, startDate, endDate, dueDate, address1, address2, address3, pay, description, category, img1, img2, img3 } = req.body;

        await Post.update({
            title : title,
            startDate : startDate,
            endDate : endDate,
            dueDate : dueDate,
            address1 : address1,
            address2 : address2,
            address3 : address3,
            pay : pay,
            description : description,
            category : category,
            img1 : img1,
            img2 : img2,
            img3 : img3,
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