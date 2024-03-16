import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiUser";
import { useSearchParams } from "react-router-dom";

export function useUsers() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUsers({ page }),
  });

  return { data, isLoading, error };
}
