import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe as updateMeApi } from "../../services/apiUser";
import { toast } from "react-toastify";
import { setUserUpdate } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: updateMeApi,
    onSuccess: (data) => {
      toast.success("User updated successfully!", { autoClose: 1000 });
      dispatch(setUserUpdate(data.data));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updateUser };
}
