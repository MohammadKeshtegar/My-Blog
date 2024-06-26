import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPost";

export function useGetPost(postId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getPost(postId),
    queryKey: ["post"],
  });

  return { isLoading, data };
}
