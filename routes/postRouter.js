import express from "express"
import {
    findAllPost,
    findPost,
    createPost,
    modifyPost,
    deletePost,
    findPostByUserId,
    findHighPayPost,
    findSameAddressPost,
} from "../controller/postController"

const router = express.Router();

// 모든 게시물 조회 (+ 페이징 처리)
router.get("/list/:page", findAllPost);

// 고수익 알바 게시물 리스트 조회
router.get("/payList/:page", findHighPayPost);

// 우리 동네 알바 게시물 리스트 조회
router.get("/addressList/:page", findSameAddressPost);

// req.params.postId로 해당 게시물 상세 조회
router.get("/:postId", findPost);

// req.user.id로 로그인된 사용자가 게시한 게시물 목록 조회
router.get("/registerList", findPostByUserId);

// 게시물 등록
router.post("/", createPost);

// req.params.postId로 해당 게시물 수정
router.put("/:postId", modifyPost);

// req.params.postId로 해당 게시물 삭제
router.delete("/:postId", deletePost);

/**
 * @swagger
 * tags:
 *   name: PostRouter
 *   description: /api/post/
 * /api/post/list/{page}:
 *   get:
 *     tags:
 *       - PostRouter
 *     name: QueryList
 *     summary: 필터링 거친 게시물 리스트 조회 (+페이징)
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: path
 *         description: 페이지
 *         required: true
 *         type: integer
 *       - name: pay
 *         in: query
 *         description: 시급
 *         required: true
 *         type: integer
 *       - name: category
 *         in: query
 *         description: 업종
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *           enum:
 *             - "ETC"
 *             - "CAFE"
 *             - "RESTAURANT"
 *             - "PC"
 *       - name: address1
 *         in: query
 *         description: 시
 *         required: true
 *         type: string
 *       - name: address2
 *         in: query
 *         description: 구
 *         required: true
 *         type: string
 *       - name: startDate
 *         in: query
 *         description: 시작날짜
 *         required: true
 *         type: string
 *         format: date
 *       - name: endDate
 *         in: query
 *         description: 끝날짜
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       200:
 *         description: User found and logged in successfully
 *       401:
 *         description: Bad username, not found in db
 *       403:
 *         description: Username and password don't match
 *       404:
 *         description: Not Found
 * /api/post/registerList:
 *   get:
 *     tags:
 *       - PostRouter
 *     name: registerList
 *     summary: 로그인된 사용자가 게시한 게시물 목록 조회
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: User found and logged in successfully
 *       401:
 *         description: Bad username, not found in db
 *       403:
 *         description: Username and password don't match
 *       404:
 *         description: Not Found
 */
module.exports = router;