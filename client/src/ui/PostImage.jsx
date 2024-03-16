function PostImage({ defaultImage, imageCover, styles }) {
  return (
    <img
      src={defaultImage ? `http://127.0.0.1:3000/images/posts/${imageCover}` : "/default-post.png"}
      alt="post-cover"
      className={styles}
    />
  );
}

export default PostImage;
