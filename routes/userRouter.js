import express from "express"
import { addUserInfo, findUser, modifyUser, deleteUser } from "../controller/userController"

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// req.user.id로 현재 로그인된 회원 조회
router.get("/findUser", isLoggedIn, findUser);

// sns로그인 직후 추가로 회원정보 받기
router.put("/addUserInfo", addUserInfo);

// req.user.id로 현재 로그인된 회원 정보 수정
router.put("/modifyUser", isLoggedIn, modifyUser);

// req.user.id로 현재 로그인된 회원 탈퇴
router.delete("/deleteUser", isLoggedIn, deleteUser);

module.exports = router;