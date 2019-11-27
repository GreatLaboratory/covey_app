import Joi from "joi"

const { User, Apply, Post, Career } = require("../models");

// GET -> 현재 로그인된 회원 조회
const findAuthorizedUser = async (req, res, next) => {
    try {
        const result = await User.findOne({
            where : { id : req.user.id },
            // where : { id : 5 },
            include : { model : Career }  // 경력사항 리스트 보여주기
        });
        if (!result) {
            res.status(404).json({ message : "Not Found"});
            return;
        }
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


// GET -> 메인화면이나 게시물 목록 화면에서 게시물 클릭했을 때 해당 게시물 지원자들의 닉네임과 번호의 리스트 조회
const findApplicant = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403).json({ message : "로그인 필요" });
        }

        // if (post.userId !== 12) {
        if (post.userId !== req.user.id) {
            res.status(204).json([]);
        } else {
            const applies = await Apply.findAll({ where: { postId : req.params.postId } });
            var users = [];
            for (var i in applies) {
                users[i] = await User.findOne({
                    where: { id : applies[i].userId },
                    attributes: ['name', 'phoneNum']
                });
            }
            res.status(200).json(users);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// GET -> 게시물 상세보기 화면에서 닉네임 클릭했을 때 (지원자 or 게시자)의 프로필 조회
// 지원자는 클라이언트에서 접근할 때 user.id
// 게시자는 클라이언트에서 접근할 때 post.userId
const findUser = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (Number.isNaN(userId)) {
            return res.status(400).json({ message : "Bad Request"});
        }
        const user = await User.findOne({
            where : { id : req.params.userId }
        });
        if (!user) {
            res.status(404).json({ message : "Not Found"});
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//PUT -> 로그인된 회원 정보 수정
const modifyUser = async (req, res, next) => {
    try {
        // 업로드 테스트 콘솔
        console.log(req.file);

        // joi 패키지를 이용한 input값 validation과정
        const schema = {
            name : Joi.string().min(3),
            gender : Joi.boolean(),
            age : Joi.number().integer(),
            address1 : Joi.string().min(3),
            address2 : Joi.string().min(3),
            intro : Joi.string().min(3),
        };
        const joiResult = Joi.validate(req.body, schema);
        if (joiResult.error) {
            // 400 Bad Request
            res.status(400).json({ message : joiResult.error.details[0].message });
            return;
        }

        const { name, gender, age, address1, address2, intro } = req.body;

        if(req.file !=null) {
            var imgUrl = `/img/${req.file.filename}`;
        } else {
            var imgUrl = null;
        }

        await User.update({
            name : name,
            gender : gender,
            age : age,
            address1 : address1,
            address2 : address2,
            intro : intro,
            img : imgUrl,
        }, {
            where : { id : req.user.id }
            // where : { id : 11 }
        });

        res.status(201).json({ message : '성공적으로 수정되었습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// DELETE -> 로그인된 회원 탈퇴
const deleteUser = async (req, res, next) => {
  try {
      await User.destroy({ where : { id : req.user.id }});
      res.status(204).json({ message : '성공적으로 삭제되었습니다.' });
  } catch (err) {
      console.error(err);
      next(err);
  }
};

export { findAuthorizedUser, findUser, modifyUser, deleteUser, findApplicant }