import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setUserData } from "../../redux/user/userSlice";
import { signupUser } from "../../services/apiUser";

export function useSingup() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isPending: isSigningup, mutate: signup } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast.success("You successfully signed up!", { autoClose: 1000 });
      dispatch(setUserData(data.data));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSigningup, signup };
}
