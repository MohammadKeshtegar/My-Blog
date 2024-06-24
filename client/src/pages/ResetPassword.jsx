import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useResetPassword } from "../featues/authentication/useResetPassword";
import AuthFormGroup from "../ui/AuthFormGroup";
import FillButton from "../ui/FillButton";

function ResetPassword() {
  const { isReseting, resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    if (data.password !== data.confirmPassword) return toast.error("Password does not match!");
    const passwordData = { ...data, token };
    resetPassword(passwordData, { onSuccess: () => navigate("/signin") });
  }

  return (
    <>
      <div className="h-screen grid place-items-center bg-neutral-900/95 bg-gradient-to-tr from-neutral-900/80 to-neutral-800 text-white">
        <Form className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-700/40" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center py-4 text-3xl font-semibold">Forgot password</h2>

          <AuthFormGroup label="Password" htmlFor="email" error={errors.email}>
            <input
              className="input-data-auth"
              type="password"
              placeholder="New password"
              id="password"
              name="password"
              disabled={isReseting}
              {...register("password")}
            />
          </AuthFormGroup>

          <AuthFormGroup label="Confirm password" htmlFor="email" error={errors.email}>
            <input
              className="input-data-auth"
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              name="confirmPassword"
              disabled={isReseting}
              {...register("confirmPassword")}
            />
          </AuthFormGroup>

          <FillButton type="submit" disabled={isReseting}>
            {isReseting ? "Loading..." : "Reset"}
          </FillButton>
        </Form>
      </div>
    </>
  );
}

export default ResetPassword;
