import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/apiPost";
import { useParams } from "react-router-dom";

export function usePost() {
  const { slug } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getPost(slug),
  });

  return { isLoading, error, data };
}
