import express from "express"
import { findAllPost, findPost, createPost, modifyPost, deletePost, findPostByUserId } from "../controller/postController"

const router = express.Router();

// 모든 게시물 조회 (+ 페이징 처리)
router.get("/findAllPost/:page", findAllPost);

// req.params.id에 있는 post.id로 해당 게시물 조회
router.get("/findPost/:id", findPost);

// req.user안에 들어있는 req.user.id로 게시한 게시물 조회
router.get("/findPostByUserId", findPostByUserId);

// 게시물 등록
router.post("/createPost", createPost);

// req.params.id에 있는 post.id로 해당 게시물 수정
router.put("/modifyPost/:id", modifyPost);

// req.params.id에 있는 post.id로 해당 게시물 삭제
router.delete("/deletePost/:id", deletePost);

module.exports = router;