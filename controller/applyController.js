const { Post, Apply } = require("../models");

// POST -> 게시물 지원하기
const applyPost = async (req, res, next) => {
    try {
        const result = await Apply.create({
            //userId : req.user.id,
            userId : 2,
            postId : req.params.postId
        });
        res.status(201).json(`${result}개의 게시물이 성공적으로 지원되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// Get -> req.user.id로 자신이 지원한 게시물 리스트 조회
const findAllApplied = async (req, res, next) => {
    try {
        const result = await Apply.findAll({
            // where : { userId : req.user.id }
            where : { userId : 2 }
        });
        var post = [];
        for (var i in result) {
            post[i] = await Post.findOne({
                where : { id : result[i].postId }
            });
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE -> 지원 취소
const cancelApply = async (req, res, next) => {
    try {
        const result = await Apply.destroy({
            where : {
                //userId : req.user.id
                userId : 2,
                postId : req.params.postId
            }
        });
        res.status(204).json(`${result}개의 지원요청이 성공적으로 삭제되었습니다.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

/* PUT -> 지원자 매칭하기 / 나머지 지원자는 matching->false
const matching = async (req, res, next) => {
  try {
      await Apply.update({
          matching: true
      }, {
          where : {
              userId : req.params.userId,
              postId : req.params.postId
          }
      });

      const result = await Apply.findAll({
          where : { postId : req.params.postId }
      });

      for (var i in result) {
          if (result[i].userId == req.params.userId) {
              continue;
          }
          await Apply.update({
              matching: false
          }, {
              where : {
                  userId : result[i].userId,
                  postId : req.params.postId
              }
          });
      }
      res.status(201).json({ message : "매칭이 성사되었습니다." });
  } catch (err) {
      console.error(err);
      next(err);
  }
};
*/

export { applyPost, findAllApplied, cancelApply }