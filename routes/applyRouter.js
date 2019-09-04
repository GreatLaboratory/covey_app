import express from "express"
import { findAllApplied, applyPost, cancelApply} from "../controller/applyController"

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// 게시물 지원하기
router.post("/applyPost/:postId", isLoggedIn, applyPost);

// req.user.id로 자신이 지원한 게시물 리스트 조회
router.get("/findAllApplied", isLoggedIn, findAllApplied);

// 지원 취소
router.delete("/cancelApply/:postId", isLoggedIn, cancelApply);

// 선택-매칭하기


module.exports = router;