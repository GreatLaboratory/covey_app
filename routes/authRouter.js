import express from "express"
import passport from "passport"
import { logout, sendCodeToPhone, verifyCode } from "../controller/authController";

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// 이렇게 요청하면 카카오 로그인 창으로 리다이렉트가 간다.
router.get("/kakao", passport.authenticate("kakao"));

// 로그인 결과를 받는다.
router.get("/kakao/callback", passport.authenticate("kakao", {failureRedirect:"/"}), (req, res) => { res.json(req.user) });

// 이렇게 요청하면 페이스북 로그인창으로 리다이렉트가 간다.
router.get("/facebook", passport.authenticate("facebook"));

// 로그인 결과를 받는다.
router.get("/facebook/callback", passport.authenticate("facebook", {failureRedirect:"/"}), (req, res) => { res.json(req.user) });

// 로그아웃
router.get("/logout", isLoggedIn, logout);

// 폰번호로 인증번호 발송
router.post('/phone', sendCodeToPhone);

// 인증번호 인증-
router.post('/verify', verifyCode);

/**
 * @swagger
 * tags:
 *   name: AuthRouter
 *   description: 회원가입 & 로그인관련 api
 * /api/auth/kakao:
 *   get:
 *     tags:
 *       - AuthRouter
 *     summary: 카카오 회원가입
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 회원가입 및 로그인 성공
 *       404:
 *         description: Not Found
 * /api/auth/facebook:
 *   get:
 *     tags:
 *       - AuthRouter
 *     summary: 페이스북 회원가입 (미완성)
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: 회원가입 및 로그인 성공
 *       404:
 *         description: Not Found
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - AuthRouter
 *     summary: 로그아웃하기
 *     consumes:
 *       - application/json
 *     responses:
 *       204:
 *         description: 로그아웃 성공
 *       403:
 *         description: 로그인 필요
 *       404:
 *         description: Not Found
 * /api/auth/phone:
 *   post:
 *     tags:
 *       - AuthRouter
 *     summary: 폰번호로 인증번호 발송
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: |
 *           핸드폰 번호를 json형식으로 request body에 넣어줘야함.
 *           {
 *              "phoneNum" : "01092988726"
 *           }
 *         required: true
 *     responses:
 *       201:
 *         description: 인증번호 발송 성공
 *       404:
 *         description: Not Found
 * /api/auth/verify:
 *   post:
 *     tags:
 *       - AuthRouter
 *     summary: 인증번호 인증하기
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: |
 *           핸드폰 번호와 인증번호를 json형식으로 request body에 넣어줘야함.
 *           {
 *              "phoneNum" : "01092988726",
 *              "verifyNumFromClient" : 4561237858
 *           }
 *         required: true
 *     responses:
 *       201:
 *         description: 인증 성공
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: Not Found
 */
module.exports = router;