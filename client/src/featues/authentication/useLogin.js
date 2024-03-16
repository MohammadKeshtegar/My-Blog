import { useMutation } from "@tanstack/react-query";
import { loginUser as loginUserApi } from "../../services/apiUser";
import { toast } from "react-toastify";

import { setUserData } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function useLogin() {
  const dispatch = useDispatch();

  const { isPending: isLogging, mutate: login } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      dispatch(setUserData(data.data));
      toast.success("You successfully logged in", { autoClose: 1000 });
    },
    onError: () => toast.error("Incorrent email or password!"),
  });

  return { isLogging, login };
}
