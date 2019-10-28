import express from "express"
import {
    findCareerList,
    findCareer,
    createCareer,
    modifyCareer,
    deleteCareer,
} from "../controller/careerController"

const router = express.Router();

// 현재 로그인된 사용자의 경력사항 리스트 조회
router.get('/list', findCareerList);

// 클릭한 경력사항 정보 조회
router.get('/:careerId', findCareer);

// 현재 로그인된 사용자의 경력사항 추가하기
router.post('/', createCareer);

// 현재 로그인된 사용자의 경력사항 추가하기
router.put('/:careerId', modifyCareer);

// 현재 로그인된 사용자의 경력사항 추가하기
router.delete('/:careerId', deleteCareer);

module.exports = router;