import express from "express"
import {
    findCareerList,
    findCareer,
    createCareer,
    modifyCareer,
    deleteCareer,
} from "../controller/careerController"

const router = express.Router();
const { isLoggedIn } = require('./middleWares');

// 현재 로그인된 사용자의 경력사항 리스트 조회
router.get('/list', isLoggedIn, findCareerList);

// 클릭한 경력사항 정보 조회
router.get('/:careerId', isLoggedIn, findCareer);

// 현재 로그인된 사용자의 경력사항 추가하기
router.post('/', isLoggedIn, createCareer);

// 현재 로그인된 사용자의 경력사항 수정하기
router.put('/:careerId', isLoggedIn, modifyCareer);

// 현재 로그인된 사용자의 경력사항 삭제하기
router.delete('/:careerId', isLoggedIn, deleteCareer);

/**
 * @swagger
 * tags:
 *   name: CareerRouter
 *   description: 경력관련 api
 * /api/career/list:
 *   get:
 *     tags:
 *       - CareerRouter
 *     summary: 로그인된 사용자의 경력사항 리스트 조회
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 리스트 조회 성공
 *       404:
 *         description: Not Found
 * /api/career/{careerId}:
 *   get:
 *     tags:
 *       - CareerRouter
 *     summary: 경력사항 세부내용 조회하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: careerId
 *         in: path
 *         description: 조회할 경력사항 번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: Not Found
 *   put:
 *     tags:
 *       - CareerRouter
 *     summary: 경력사항 수정하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: careerId
 *         in: path
 *         description: 수정할 경력사항 번호
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: |
 *           경력사항 수정할 때 request body에 넣어줘야할 json
 *           1. 수정하려는 내용의 key만 선별해서 json작성
 *           2. "id", "userId" 이렇게 2개 key들은 body에서 제외해야함.
 *           3. category는 "주", "개월", "년" 중에 하나로
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Career'
 *     responses:
 *       201:
 *         description: 수정 성공
 *       404:
 *         description: Not Found
 *   delete:
 *     tags:
 *       - CareerRouter
 *     summary: 경력사항 삭제하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: careerId
 *         in: path
 *         description: 삭제할 경력사항 번호
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: Not Found
 * /api/career:
 *   post:
 *     tags:
 *       - CareerRouter
 *     summary: 경력사항 추가하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: |
 *           경력사항 추가할 때 request body에 넣어줘야할 json
 *           1. "id", "userId" 이렇게 2개 key들은 body에서 제외해야함.
 *           2. category는 "주", "개월", "년" 중에 하나로
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Career'
 *     responses:
 *       201:
 *         description: 추가 성공
 *       404:
 *         description: Not Found
 */
module.exports = router;