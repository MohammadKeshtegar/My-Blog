import { useQuery } from "@tanstack/react-query";
import { getMarkPost } from "../../services/apiPost";

export function useGetMarkPosts(markPosts) {
  const { isLoading, data } = useQuery({
    queryKey: ["post"],
    queryFn: () => getMarkPost(markPosts),
  });

  return { isLoading, data };
}
