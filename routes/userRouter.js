import express from "express"
import { addUserInfo, findUser, modifyUser, deleteUser, upload, upload2 } from "../controller/userController"
import fs from "fs";

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// req.user.id로 현재 로그인된 회원 조회
router.get("/findUser", isLoggedIn, findUser);

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

// sns로그인 직후 추가로 회원정보 받기
router.put("/addUserInfo", upload.single(), addUserInfo);

// req.user.id로 현재 로그인된 회원 정보 수정
router.put("/modifyUser", isLoggedIn, modifyUser);

// req.user.id로 현재 로그인된 회원 탈퇴
router.delete("/deleteUser", isLoggedIn, deleteUser);

module.exports = router;