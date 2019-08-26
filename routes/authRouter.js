import express from "express"
import passport from "passport"

const router = express.Router();

// 카카오 로그인 창으로 리다이렉트
router.get("/kakao", passport.authenticate("kakao"));

// 로그인 결과를 받는다.
router.get("/kakao/callback", passport.authenticate("kakao", {failureRedirect:"/"}), (req, res) => { res.json(req.user) });

module.exports = router;

// 콜백함수가 따로 필요 없기 때문에 controller 불필요