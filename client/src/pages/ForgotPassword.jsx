import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useState } from "react";

import { useForgotPassword } from "../featues/authentication/useForgotPassword";
import AuthFormGroup from "../ui/AuthFormGroup";
import FillButton from "../ui/FillButton";

function ForgotPassword() {
  const [isSend, setIsSent] = useState(false);
  const port = window.location.port;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isSending, sendEmail } = useForgotPassword();

  function onSubmit({ email }) {
    sendEmail({ email, port }, { onSuccess: () => setIsSent(true) });
  }

  return (
    <>
      <div className="h-screen grid place-items-center bg-neutral-900/95 bg-gradient-to-tr from-neutral-900/80 to-neutral-800 text-white">
        <Form
          className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-700/40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center py-4 text-3xl font-semibold">Forgot password</h2>

          {isSend && (
            <div className="bg-emerald-700/50 text-emerald-200 rounded p-2 text-sm">
              <p>We sent an email to your email address, Please check your email to reset your password.</p>
            </div>
          )}

          <AuthFormGroup label="Email" htmlFor="email" error={errors.email}>
            <input
              className="input-data-auth"
              type="email"
              placeholder="Email address"
              id="email"
              name="email"
              disabled={isSending}
              {...register("email")}
            />
          </AuthFormGroup>

          <FillButton type="submit" disabled={isSending}>
            {isSending ? "Loading..." : "Send"}
          </FillButton>
        </Form>
      </div>
    </>
  );
}

export default ForgotPassword;
