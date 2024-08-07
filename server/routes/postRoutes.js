import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getMarkPosts,
  getPost,
  singlePost,
  updatePost,
  uploadPostPhoto,
} from "../controllers/postController.js";
import { protect, restrictTo } from "../controllers/authController.js";
import commentRouter from "./commentRoutes.js";

const router = express.Router();

router.use("/:postId/comments", commentRouter);

router.route("/mark-posts").post(getMarkPosts);
router.route("/post/:slug").get(singlePost);
router.route("/").get(getAllPosts).post(protect, restrictTo("admin"), uploadPostPhoto, createPost);
router.route("/:id").get(getPost).put(protect, restrictTo("admin"), uploadPostPhoto, updatePost).delete(protect, restrictTo("admin"), deletePost);

export default router;
