import express from "express"
import { findAllUser, addUserInfo, findUser, modifyUser, deleteUser } from "../controller/userController"

const router = express.Router();

// 모든 회원 목록 조회
router.get("/findAllUser", findAllUser);

// user id로 해당 회원 조회
router.get("/findUser", findUser);

// sns로그인 이후 추가로 회원정보 받기
router.put("/addUserInfo", addUserInfo);

// user id로 회원 정보 수정
router.put("/modifyUser", modifyUser);

// user id로 회원 정보 삭제
router.delete("/deleteUser", deleteUser);

module.exports = router;