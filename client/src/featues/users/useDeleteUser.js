import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiUser";
import { toast } from "react-toastify";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingUser, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User successfully deleted", { autoClose: 1000 });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingUser, deleteUser };
}
