import express from "express"
import { findAllApplied, applyPost, cancelApply, matching} from "../controller/applyController"

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// 게시물 지원하기
router.post("/:postId", applyPost);

// 지원 취소
router.delete("/:postId", cancelApply);

// req.user.id로 자신이 지원한 게시물 리스트 조회
router.get("/appliedList", findAllApplied);

/**
 * @swagger
 * tags:
 *   name: ApplyRouter
 *   description: 지원관련 api
 * /api/apply/{postId}:
 *   post:
 *     tags:
 *       - ApplyRouter
 *     summary: 게시물에 지원하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 지원할 게시물 번호
 *         required: true
 *         type: integer
 *     responses:
 *       201:
 *         description: 지원 성공
 *       404:
 *         description: Not Found
 *   delete:
 *     tags:
 *       - ApplyRouter
 *     summary: 게시물에 지원 취소하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 지원 취소할 게시물 번호
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: Not Found
 * /api/apply/appliedList:
 *   get:
 *     tags:
 *       - ApplyRouter
 *     summary: 로그인된 사용자가 지원한 게시물 리스트 조회
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: Not Found
 */
module.exports = router;