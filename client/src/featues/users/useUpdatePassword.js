import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../services/apiUser";
import { toast } from "react-toastify";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingPassword, mutate: updatePassword } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.toString().startsWith("Error: ")) {
        toast.error(data.message);
      } else {
        toast.success("Password successfully updated", { autoClose: 1000 });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingPassword, updatePassword };
}
