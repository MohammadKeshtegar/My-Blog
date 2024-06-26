import catchAsync from "../utils/catchAsync.js";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
});

export const createComment = catchAsync(async (req, res, next) => {
  const newComment = await Comment.create({
    content: req.body.comment,
    userId: req.user._id,
    postId: req.body.postId,
    userRating: req.body.userRating,
  });

  let post;

  if (req.body.userRating) {
    post = await Post.findByIdAndUpdate(req.body.postId, { $set: { userRating: req.body.userRating } }, { new: true });
  }

  res.status(200).json({
    status: "success",
    data: { newComment, post },
  });
});
