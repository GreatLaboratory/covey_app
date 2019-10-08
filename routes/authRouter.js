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

// 인증번호 인증
router.post('/verify', verifyCode);

module.exports = router;