import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { logoutUser as logoutUserApi } from "../../services/apiUser";
import { setUserLogout } from "../../redux/user/userSlice";

export function useLogout() {
  const dispatch = useDispatch();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      dispatch(setUserLogout());
      toast.success("You successfully logged out!", { autoClose: 1000 });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoggingOut, logout };
}
