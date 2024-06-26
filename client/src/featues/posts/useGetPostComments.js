import { useQuery } from "@tanstack/react-query";
import { getPostComments as getPostCommentsApi } from "../../services/apiComment";

export function useGetPostComments(postId) {
  const { isLoading, data } = useQuery({
    queryFn: () => getPostCommentsApi(postId),
    queryKey: ["comments"],
  });

  return { isLoading, data };
}
