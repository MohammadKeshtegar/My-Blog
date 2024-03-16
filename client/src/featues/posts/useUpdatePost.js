import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "../../services/apiPost";
import { toast } from "react-toastify";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingPost, mutate: updatePost } = useMutation({
    mutationFn: ({ id, updatedPost }) => updatePostApi(id, updatedPost),
    onSuccess: () => {
      toast.success("Post successfully updated", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdatingPost, updatePost };
}
