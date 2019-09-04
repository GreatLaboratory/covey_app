import Joi from "joi"
import multer from "multer"

const { User } = require("../models");

// GET
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
const upload2 = multer();
// upload는 미들웨어를 만드는 객체가 된다.
// storage에는 파일 저장 방식과 경로, 파일명 등을 설정할 수 있다.
// diskStorage를 사용해 이미지가 서버 디스크에 저장되도록 했고 destination메소드로 저장경로를 uploads폴더로 지정한다.
// 파일명은 filename메소드로 기존이름+날짜+기존확장자로 설정한다.
// limit으로 파일 최대 용량 / 지금은 10MB
// 이렇게 만들어진 upload변수는 미들웨어를 만드는 여러 가지 메소드를 가지고 있다.
// single은 하나의 이미지를 업로드할 때 사용, none은 이미지를 올리지않고 데이터만 multipart형식으로 전송했을 때 사용 / req.file에 내용저장
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

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

      const { address, age, career, nickname, gender, univ, url } = req.body;
      const result = await User.update({
          address : address,
          age : age,
          career : career,
          nickname : nickname,
          gender : gender,
          univ : univ,
          img : url
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

export { addUserInfo, findUser, modifyUser, deleteUser, upload, upload2 }