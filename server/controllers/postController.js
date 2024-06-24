import slugify from "slugify";
import Post from "../models/postModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/posts");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `imageCover-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadPostPhoto = upload.single("imageCover");

export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort("-createdAt");

  res.status(200).json({
    status: "success",
    resulst: posts.length,
    data: posts,
  });
});

export const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: post,
  });
});

export const singlePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate("comments");

  if (post && post.comments) post.comments.sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json({
    status: "success",
    data: post,
  });
});

export const createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    shortDescription: req.body.shortDescription,
  });

  if (req.file) post.imageCover = req.file.filename;

  res.status(201).json({ status: "success", data: post });
});

export const updatePost = async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true, runValidators: true }
  );

  if (req.file) post.imageCover = req.file.filename;

  if (!post) next(new AppError("No post found with this id", 404));

  post.slug = slugify(post.title, { lower: true });

  await post.save();

  res.status(200).json({ status: "success", data: post });
};

export const deletePost = async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) return next(new AppError("No post found with this id", 404));

  res.status(200).json({ status: "success", message: "Post successfully deleted" });
};
