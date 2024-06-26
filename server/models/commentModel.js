import mongoose from "mongoose";
import Post from "./postModel.js";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    postId: { type: mongoose.Schema.ObjectId, ref: "Post", required: [true, "Review must belong to a post!"] },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "Review must belong to a user!"] },
    userRating: { type: Number, min: 0, max: 5 },
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

commentSchema.statics.calcAverageRating = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: { postId: postId },
    },
    {
      $group: {
        _id: "$postId",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$userRating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Post.findByIdAndUpdate(postId, {
      ratingAverage: stats[0].avgRating,
      ratingQuantity: stats[0].nRating,
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      ratingAverage: 4.5,
      ratingQuantity: 0,
    });
  }
};

commentSchema.post("save", async function () {
  this.constructor.calcAverageRating(this.postId);
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
