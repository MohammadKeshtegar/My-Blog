import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPassowrdApi } from "../../services/apiUser";
import { toast } from "react-toastify";

export function useResetPassword() {
  const { isPending: isReseting, mutate: resetPassword } = useMutation({
    mutationFn: resetPassowrdApi,
    onSuccess: () => toast.success("Password successfully reset!"),
    onError: (err) => toast.error(err.message),
  });

  return { isReseting, resetPassword };
}
