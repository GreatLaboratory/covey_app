import express from "express"
import {
    addUserInfo,
    findUser,
    modifyUser,
    deleteUser,
    upload,
    findApplicant,
    findAuthorizedUser,
    addCareer
} from "../controller/userController"
import fs from "fs";

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// req.user.id로 현재 로그인된 회원 조회
router.get("/", findAuthorizedUser);

// 게시물 열었을 때 지원한 자들의 닉네임과 번호의 리스트 조회
router.get("/applicants/:postId", findApplicant);

// (지원자 or 게시자)의 프로필 조회
router.get("/others/:userId", findUser);

// img 업로드
fs.readdir('uploads', (error) => {
    if (error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});
// router.post("/img", upload.single(), (req, res) => {
//     console.log(req.file);
//     res.json({ url: `/img/${req.file.filename}` });
// });

// sns로그인 직후 추가로 회원정보 받기  -> 이건 밑에 있는 라우터로도 얼마든지 가능함
// router.put("/signUp", addUserInfo);

// req.user.id로 현재 로그인된 회원 정보 수정
router.put("/", isLoggedIn, modifyUser);

// req.user.id로 현재 로그인된 회원 탈퇴
router.delete("/", isLoggedIn, deleteUser);

// 경력사항 추가
router.post('/career', addCareer);

module.exports = router;