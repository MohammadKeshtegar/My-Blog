import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";

import { useUpdatePassword } from "./useUpdatePassword";
import SubmitButton from "../../ui/SubmitButton";
import FormRow from "../../ui/FormIRow";

function UserPasswordForm() {
  const { register, formState, handleSubmit, reset } = useForm();
  const { isUpdatingPassword, updatePassword } = useUpdatePassword();
  const { errors } = formState;

  function onSubmit(data) {
    updatePassword(data, { onSuccess: () => reset() });
  }

  if (errors.length > 0) {
    console.error(errors);
    Object.keys(errors).forEach((err) => {
      toast.error(err.message);
    });
  }

  return (
    <div className="p-5 flex flex-col items-center justify-center ">
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-3/4">
        <FormRow htmlFor="currentPassword" text="Current password">
          <input
            type="password"
            className="input-data-update"
            placeholder="current password"
            {...register("passwordCurrent")}
          />
        </FormRow>

        <FormRow htmlFor="password" text="Passwrod">
          <input
            type="password"
            className="input-data-update"
            placeholder="password"
            {...register("password")}
          />
        </FormRow>

        <FormRow htmlFor="confirmPassword" text="Confirm password">
          <input
            type="password"
            className="input-data-update"
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
        </FormRow>

        <SubmitButton disabled={isUpdatingPassword}>
          {isUpdatingPassword ? "Loading..." : "Update"}
        </SubmitButton>
      </Form>
    </div>
  );
}

export default UserPasswordForm;
