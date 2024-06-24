import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { forgotPassword } from "../../services/apiUser";

export function useForgotPassword() {
  const { isPending: isSending, mutate: sendEmail } = useMutation({
    mutationFn: ({ email, port }) => forgotPassword({ email, port }),
    onSuccess: () =>
      toast.success("Email successfully sent to your email!", {
        autoClose: 2000,
      }),
    onError: (err) => toast.error(err.message),
  });

  return { isSending, sendEmail };
}
