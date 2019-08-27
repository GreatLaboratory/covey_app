import express from "express"
import { findAllPost, findPost, createPost, modifyPost, deletePost } from "../controller/postController"

const router = express.Router();

// 모든 게시물 조회
router.get("/findAllPost", findAllPost);

// post.id로 해당 게시물 조회
router.get("/findPost/:id", findPost);

// 게시물 등록
router.post("/createPost", createPost);

// post.id로 해당 게시물 수정
router.put("/modifyPost/:id", modifyPost);

// post.id로 해당 게시물 삭제
router.delete("/deletePost/:id", deletePost);

module.exports = router;