import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../services/apiPost";
import { useParams } from "react-router-dom";

export function usePost() {
  const { slug } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getSinglePost(slug),
  });

  return { isLoading, error, data };
}
