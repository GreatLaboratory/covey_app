import express from "express"
import { findAllApplied, applyPost, cancelApply, matching} from "../controller/applyController"

const { isLoggedIn } = require("./middleWares");
const router = express.Router();

// 게시물 지원하기
router.post("/:postId", isLoggedIn, applyPost);

// req.user.id로 자신이 지원한 게시물 리스트 조회
router.get("/appliedList", isLoggedIn, findAllApplied);

// 지원 취소
router.delete("/:postId", isLoggedIn, cancelApply);

// 선택-매칭하기
router.put("/match/:postId/:userId", matching);

module.exports = router;