import express from "express";
import { createComment, getAllComments } from "../controllers/commentController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllComments).post(protect, restrictTo("user"), createComment);

export default router;
