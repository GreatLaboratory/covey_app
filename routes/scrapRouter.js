import express from "express"
import { scrapPost, findAllScrap, cancelScrap } from "../controller/scrapController"

const router = express.Router();

// 사용자가 게시물 스크랩하기
router.post("/scrapPost/:postId", scrapPost);

// 사용자의 user.id로 스크랩한 게시물 리스트 조회
router.get("/findAllScrap", findAllScrap);

// 스크랩 취소
router.delete("/cancelScrap/:postId", cancelScrap);

module.exports = router;