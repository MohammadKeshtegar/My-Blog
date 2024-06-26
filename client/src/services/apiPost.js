import { PAGE_SIZE } from "../utils/constant";

export async function getPosts({ page }) {
  try {
    const res = await fetch("/api/v1/posts");
    let data = await res.json();
    const count = data.data.length;

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE + 1;
      data = data.data.slice(from, to);
    }

    return { data, count };
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getPost(id) {
  const res = await fetch(`/api/v1/posts/${id}`);
  const data = await res.json();

  return data;
}

export async function getSinglePost(slug) {
  const res = await fetch(`/api/v1/posts/post/${slug}`);
  const data = await res.json();

  return data;
}

export async function getMarkPost(markPosts) {
  const res = await fetch("/api/v1/posts/mark-posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ markPosts }),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function createPost(postData) {
  try {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("shortDescription", postData.shortDescription);
    formData.append("imageCover", postData.imageCover[0]);
    formData.append("category", postData.category);

    const res = await fetch("/api/v1/posts", { method: "POST", body: formData });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function updatePost(id, updatedPost) {
  try {
    const formData = new FormData();
    formData.append("title", updatedPost.title);
    formData.append("description", updatedPost.description);
    formData.append("shortDescription", updatedPost.shortDescription);
    formData.append("imageCover", updatedPost.imageCover[0]);
    formData.append("category", updatedPost.category);

    const res = await fetch(`/api/v1/posts/${id}`, { method: "PUT", body: formData });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function deletePost(id) {
  try {
    const res = await fetch(`/api/v1/posts/${id}`, { method: "DELETE" });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
