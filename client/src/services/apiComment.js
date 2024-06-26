export async function createComment({ userRating, comment, postId }) {
  const res = await fetch(`/api/v1/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment, postId, userRating }),
  });
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}

export async function getPostComments(postId) {
  const res = await fetch(`/api/v1/${postId}/comments`);
  const data = await res.json();

  if (!res.ok) console.error(data);

  return data;
}
