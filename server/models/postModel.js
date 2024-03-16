import mongoose from "mongoose";
import slugify from "slugify";
import path from "path";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "A post must have a name"] },
    shortDescription: { type: String, required: [true, "A post must have a short intro"], minLength: 10 },
    description: { type: String, required: [true, "A post must conatin content"] },
    category: { type: String, required: [true, "A post must have a category"] },
    imageCover: { type: String, default: "../data/default-post.png" },
    averageRating: { type: Number, default: 4.5 },
    averageQuantity: { type: Number, default: 0 },
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

postSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
