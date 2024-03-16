import mongoose from "mongoose";
import Post from "./postModel.js";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.ObjectId, ref: "Post", required: [true, "Review must belong to a post!"] },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "Review must belong to a user!"] },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "name photo",
  });

  next();
});

commentSchema.post("save", function () {
  this.constructor.calcAverageRating(this.postId);
});

commentSchema.methods.calcAverageRating = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { post: postId },
    },
    {
      $group: {
        _id: "$post",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      ratingQuantity: 0,
      ratingAverage: 4.5,
    });
  }
};

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
