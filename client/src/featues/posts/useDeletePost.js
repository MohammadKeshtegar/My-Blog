import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../../services/apiPost";
import { toast } from "react-toastify";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingPost, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post successfully deleted", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingPost, deletePost };
}
