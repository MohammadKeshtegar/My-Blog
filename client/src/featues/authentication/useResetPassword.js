import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { resetPassword as resetPassowrdApi } from "../../services/apiUser";

export function useResetPassword() {
  const { isPending: isReseting, mutate: resetPassword } = useMutation({
    mutationFn: resetPassowrdApi,
    onSuccess: () => toast.success("Password successfully reset!"),
    onError: (err) => toast.error(err.message),
  });

  return { isReseting, resetPassword };
}
