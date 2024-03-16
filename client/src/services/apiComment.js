export async function createComment({ averageRating, comment, postId }) {
  const res = await fetch(`/api/v1/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment, postId, averageRating }),
  });
  const data = await res.json();

  return data;
}
