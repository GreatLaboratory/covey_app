import express from "express"
import {
    findAllPost,
    findPost,
    createPost,
    modifyPost,
    deletePost,
    findPostByUserId,
} from "../controller/postController"

const router = express.Router();

// 모든 게시물 조회 (+ 페이징 처리)
router.get("/list/:page", findAllPost);

// req.params.postId로 해당 게시물 조회
router.get("/:postId", findPost);

// req.user.id로 로그인된 사용자가 게시한 게시물 목록 조회
router.get("/registerList", findPostByUserId);

// 게시물 등록
router.post("/", createPost);

// req.params.postId로 해당 게시물 수정
router.put("/:postId", modifyPost);

// req.params.postId로 해당 게시물 삭제
router.delete("/:postId", deletePost);

module.exports = router;