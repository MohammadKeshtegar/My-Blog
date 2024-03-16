import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/apiComment";
import { toast } from "react-toastify";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      toast.success("Comment successfully added!", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createComment };
}
