import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost as createPostApi } from "../../services/apiPost";
import { toast } from "react-toastify";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingPost, mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      toast.success("Post successfully created", { autoClose: 1000 });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.error(err);
      const errStr = err.toString().slice(0, 13);
      if (errStr.includes("E11000")) {
        toast.error("There is already a post with this title!");
      } else {
        toast.error(err.message);
      }
    },
  });

  return { isCreatingPost, createPost };
}
