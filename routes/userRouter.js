import express from "express"
import {
    findUser,
    modifyUser,
    deleteUser,
    findApplicant,
    findAuthorizedUser,
} from "../controller/userController"

const { isLoggedIn, upload } = require("./middleWares");
const router = express.Router();

// req.user.id로 현재 로그인된 회원 조회
router.get("/", isLoggedIn, findAuthorizedUser);

// 게시물 열었을 때 지원한 자들의 닉네임과 번호의 리스트 조회
router.get("/applicants/:postId", findApplicant);

// (지원자 or 게시자)의 프로필 조회
router.get("/others/:userId", isLoggedIn, findUser);

// req.user.id로 현재 로그인된 회원 정보 수정
router.put("/", isLoggedIn, upload.single('img'), modifyUser);

// req.user.id로 현재 로그인된 회원 탈퇴
router.delete("/", isLoggedIn, deleteUser);

/**
 * @swagger
 * tags:
 *   name: UserRouter
 *   description: 사용자 관련 api
 * /api/user:
 *   get:
 *     tags:
 *       - UserRouter
 *     summary: 로그인된 사용자의 프로필 정보 조회
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: Not Found
 *   put:
 *     tags:
 *       - UserRouter
 *     summary: 로그인된 사용자의 프로필 정보 수정
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: |
 *           프로필 정보 수정할 때 request body에 넣어줘야할 json
 *           1. 수정하려는 내용의 key만 선별해서 json작성
 *           2. "id", "snsId","img", "phoneNum" 이렇게 4개 key들은 body에서 제외해야함.
 *           3. address1는 시/도, address2는 구/시 (ex:서울특별시 / 중랑구)
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: 수정 성공
 *       400:
 *         description: 잘못된 request body
 *       404:
 *         description: Not Found
 *   delete:
 *     tags:
 *       - UserRouter
 *     summary: 로그인된 사용자의 회원탈퇴
 *     consumes:
 *       - application/json
 *     responses:
 *       204:
 *         description: 삭제 성공
 *       404:
 *         description: Not Found
 * /api/user/applicants/{postId}:
 *   get:
 *     tags:
 *       - UserRouter
 *     summary: 게시물에 지원한 사용자들의 이름과 핸드폰 번호의 리스트 조회
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: 게시물 번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 게시자의 조회 성공
 *       204:
 *         description: 비게시자의 조회 성공
 *       404:
 *         description: Not Found
 * /api/user/others/{userId}:
 *   get:
 *     tags:
 *       - UserRouter
 *     summary: 지원자 or 게시자의 프로필 정보 조회
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: 사용자 번호
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       400:
 *         description: 잘못된 파라미터 형식의 요청
 *       404:
 *         description: Not Found
 */
module.exports = router;