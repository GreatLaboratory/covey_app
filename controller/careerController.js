const { Career } = require("../models");

// GET -> 현재 로그인된 사용자의 경력사항 리스트 보여주기
const findCareerList = async (req, res, next) => {
  try {
      const careerList = await Career.findAll({
          where : {
              // userId : req.user.id
              userId : 5
          }
      });
      res.json(careerList);
  } catch (err) {
      console.error(err);
      next(err);
  }
};

// GET -> career.id로 해당 게시물 조회
const findCareer = async (req, res, next) => {
    try {
        const result = await Career.findByPk(req.params.careerId);
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

// POST -> 현재 로그인된 사용자의 경력사항 추가하기
const createCareer = async (req, res, next) => {
    try {
        const { name, job, periodNum, periodUnit } = req.body;
        await Career.create({
            // userId : req.user.id,
            userId : 5,
            name : name,
            job : job,
            periodNum : periodNum,
            periodUnit : periodUnit,
        });
        res.status(201).json({ message : '성공적으로 경력사항을 추가하였습니다.' })
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// PUT -> 현재 로그인된 사용자의 경력사항 수정하기
const modifyCareer = async (req, res, next) => {
    try {
        const { name, job, periodNum, periodUnit } = req.body;
        await Career.update({
            name : name,
            job : job,
            periodNum : periodNum,
            periodUnit : periodUnit,
        }, {
            where : { id : req.params.careerId}
        });
        res.status(201).json({ message : '성공적으로 경력사항을 수정하였습니다.' })
    } catch (err) {
        console.error(err);
        next(err)
    }
};

// DELETE -> 현재 로그인된 사용자의 경력사항 삭제하기
const deleteCareer = async (req, res, next) => {
    try {
        await Career.destroy({ where : { id : req.params.careerId }});
        res.status(201).json({ message : '성공적으로 경력사항을 삭제하였습니다.' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export { findCareerList, findCareer, createCareer, modifyCareer, deleteCareer }