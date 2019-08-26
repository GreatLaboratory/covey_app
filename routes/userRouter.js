import express from "express"
import { findAllUser, createUser, findUser, modifyUser, deleteUser } from "../controller/userController"

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Users:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       snsId:
 *         type: string
 *       email:
 *         type: string
 */

// 모든 회원 목록 조회
router.get("/findAllUser", findAllUser);

// user id로 해당 회원 조회
router.get("/findByPk/:id", findUser);

// req.body에 받은 json을 새로운 회원에 추가
router.post("/createUser", createUser);

// user id로 회원 정보 수정
router.put("/modifyUser/:id", modifyUser);

// user id로 회원 정보 삭제
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;