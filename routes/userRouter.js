import express from "express"
import { findAllUser, createUser, findUser, modifyUser, deleteUser } from "../controller/userController"

const router = express.Router();

// 모든 회원 목록 조회
router.get("/findAllUser", findAllUser);

// user id로 해당 회원 조회
router.get("/findUser", findUser);

// req.body에 받은 json을 새로운 회원에 추가
router.post("/createUser", createUser);

// user id로 회원 정보 수정
router.put("/modifyUser", modifyUser);

// user id로 회원 정보 삭제
router.delete("/deleteUser", deleteUser);

module.exports = router;