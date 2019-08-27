import express from "express"
import passport from "passport"

const router = express.Router();

// 카카오 로그인 창으로 리다이렉트
router.get("/kakao", passport.authenticate("kakao"));

// 로그인 결과를 받는다.
router.get("/kakao/callback", passport.authenticate("kakao", {failureRedirect:"/"}), (req, res) => { res.json(req.user) });

// 로그아웃
router.get("/logout", (req, res)=>{
    req.logout();  // req.user객체를 제거하는 역할
    req.session.destroy();  // req.session 객체내용 제거 역할
    res.json({ message : "로그아웃에 성공하였습니다."});
});

module.exports = router;

// 콜백함수가 따로 필요 없기 때문에 controller 불필요