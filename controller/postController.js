// 여기선 인증 관련 권한처리 없이 순수 로직에만 집중!  이후 권한처리는 router에서 미들웨어 추가로 설정
import Joi from "joi"
const { Post, User, Sequelize: { Op } } = require("../models");
const selectedRows = 10;  // 한 페이지 당 select되는 레코드 갯수

// GET -> 필터링 게시물 조회 (+ 최근 등록 순서 페이징 처리)
const findAllPost = async (req, res, next) => {
  try {
      const { pay, address1, address2, category, startDate, endDate } = req.query;
      let pageNum = parseInt(req.params.page, 10); // 요청 페이지 넘버
      let offset = 0;

      if (Number.isNaN(pageNum)) {
          return res.status(400).end();
      }
      if(pageNum > 1){
          offset = selectedRows * (pageNum - 1);
      }
      const result = await Post.findAll({
          where: {
            pay : { [Op.gt]: pay },
            category : category,
            address1 : address1,
            address2 : address2,
            startDate : { [Op.lte] : endDate },
            endDate : { [Op.gte] : startDate },
            isDue : false,
          },
          offset : offset,
          limit : selectedRows,
          order : [["id", "DESC"]]  // 최근 등록 순으로 정렬
      });
      res.status(200).json(result);
  }  catch (err) {
      console.error(err);
      next(err);
  }
};

// GET -> 고수익 알바 게시물 리스트 조회
const findHighPayPost = async (req, res, next) => {
    try {
        let pageNum = parseInt(req.params.page, 10); // 요청 페이지 넘버
        let offset = 0;

        if (Number.isNaN(pageNum)) {
            return res.status(400).end();
        }
        if(pageNum > 1){
            offset = selectedRows * (pageNum - 1);
        }
        const result = await Post.findAll({
            where : {
                isDue : false,
            },
            offset : offset,
            limit : selectedRows,
            order : [["pay", "DESC"]],
        });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// GET -> 우리 동네 알바 게시물 리스트 조회
const findSameAddressPost = async (req, res, next) => {
    try {
        let pageNum = parseInt(req.params.page, 10); // 요청 페이지 넘버
        let offset = 0;

        if (Number.isNaN(pageNum)) {
            return res.status(400).end();
        }
        if(pageNum > 1){
            offset = selectedRows * (pageNum - 1);
        }
        const result = await Post.findAll({
            where : {
                // address1 : req.user.address1,
                // address2 : req.user.address2,
                address1 : "서울특별시",
                address2 : "종로구",
                isDue : false,
            },
            offset : offset,
            limit : selectedRows,
            order : [["id", "DESC"]] // 최근 등록 순으로 정렬
        });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// GET -> 해당 카테고리의 게시물 리스트 조회
const findCategoryPost = async (req, res, next) => {
    try {
        const { category } = req.query;
        let pageNum = parseInt(req.params.page, 10); // 요청 페이지 넘버
        let offset = 0;

        if (Number.isNaN(pageNum)) {
            return res.status(400).end();
        }
        if(pageNum > 1){
            offset = selectedRows * (pageNum - 1);
        }
        const result = await Post.findAll({
            where: {
                category : category,
                isDue : false,
            },
            offset : offset,
            limit : selectedRows,
            order : [["id", "DESC"]]  // 최근 등록 순으로 정렬
        });
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// GET -> post.id로 해당 게시물 상세 조회
const findPost = async (req, res, next) => {
    try {
        const result = await Post.findByPk(req.params.postId);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// GET -> 로그인된 사용자가 게시한 게시물 목록 조회
const findPostByUserId = async (req, res, next) => {
  try {

      // const user = await User.findOne({ where: { id : req.user.id } });
      const user = await User.findOne({ where: { id : 1 } });
      const posts = await user.getPosts();
      res.status(200).json(posts);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

// POST -> 게시물 등록
const createPost = async (req, res, next) => {
    try {
        // 업로드 테스트 콘솔
        console.log('업로드 테스트 : ' + req.files);

        // 작성한 input값 req.body에 저장 후 db에 insert하기
        const { title, startDate, endDate, dueDate, workingTime, address1, address2, address3, pay, description, category } = req.body;

        // 중복된 제목 validation
        const posts = await Post.findAll();
        const isConflict = posts.filter(post => post.title===title).length;
        if (isConflict) {
            return res.status(409).end();
        }

        // joi 패키지를 이용한 input값 validation
        const schema = {
            title : Joi.string().required(),
            startDate : Joi.date().required(),
            endDate : Joi.date().required(),
            dueDate : Joi.date().required(),
            workingTime : Joi.string().required(),
            address1 : Joi.string().required(),
            address2 : Joi.string().required(),
            address3 : Joi.string().required(),
            pay : Joi.number().required(),
            description : Joi.string().required(),
            category : Joi.string().required(),
        };
        const joiResult = Joi.validate(req.body, schema);
        if (joiResult.error) {
            // 400 Bad Request
            console.log("joi-bad request");
            return res.status(400).send(joiResult.error.details[0].message);
        }

        if(req.files.img1 !=null && req.files.img2==null && req.files.img3==null) {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = null;
            var imgUrl3 = null;
        } else if (req.files.img1 !=null  && req.files.img2!=null && req.files.img3==null) {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = `/img/${req.files.img2[0].filename}`;
            var imgUrl3 = null;
        } else {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = `/img/${req.files.img2[0].filename}`;
            var imgUrl3 = `/img/${req.files.img3[0].filename}`;
        }

        await Post.create({
            //userId : req.user.id,
            userId : 2,
            title : title,
            startDate : startDate,
            endDate : endDate,
            dueDate : dueDate,
            workingTime : workingTime,
            address1 : address1,
            address2 : address2,
            address3 : address3,
            pay : pay,
            description : description,
            category : category,
            img1 : imgUrl1,
            img2 : imgUrl2,
            img3 : imgUrl3,
        });

        res.status(201).json({ message : '성공적으로 게시물이 등록되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT -> post.id로 해당 게시물 수정
const modifyPost = async (req, res, next) => {
    try {
        const { title, startDate, endDate, dueDate, workingTime, address1, address2, address3, pay, description, category } = req.body;

        if(req.files.img1 !=null && req.files.img2==null && req.files.img3==null) {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = null;
            var imgUrl3 = null;
        } else if (req.files.img1 !=null  && req.files.img2!=null && req.files.img3==null) {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = `/img/${req.files.img2[0].filename}`;
            var imgUrl3 = null;
        } else {
            var imgUrl1 = `/img/${req.files.img1[0].filename}`;
            var imgUrl2 = `/img/${req.files.img2[0].filename}`;
            var imgUrl3 = `/img/${req.files.img3[0].filename}`;
        }

        await Post.update({
            title : title,
            startDate : startDate,
            endDate : endDate,
            dueDate : dueDate,
            workingTime : workingTime,
            address1 : address1,
            address2 : address2,
            address3 : address3,
            pay : pay,
            description : description,
            category : category,
            img1 : imgUrl1,
            img2 : imgUrl2,
            img3 : imgUrl3,
        }, {
            where : { id : req.params.postId }
        });
        await Post.findOne({ where: { title: title }});
        res.status(201).json({ message : '성공적으로 게시물이 수정되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE -> post.id로 해당 게시물 삭제
const deletePost = async (req, res, next) => {
    try {
        await Post.destroy({ where : { id : req.params.postId }});
        res.status(204).json({ message : '성공적으로 게시물이 삭제되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT -> post.id로 해당 게시물 마감하기
const duePost = async (req, res, next) => {
    try {
        await Post.update({
            isDue : 1,
        }, {
            where : { id : req.params.postId }
        });
        res.status(201).json({ message : '성공적으로 마감이 완료되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export { findAllPost, createPost, findPost, modifyPost, deletePost, findPostByUserId, findHighPayPost, findSameAddressPost , duePost, findCategoryPost}