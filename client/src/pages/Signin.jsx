import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLogin } from "../featues/authentication/useLogin";
import AuthFormGroup from "../ui/AuthFormGroup";
import FillButton from "../ui/FillButton";

function Signin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isLogging, login } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <>
      <div className="h-screen grid place-items-center bg-neutral-900/95 bg-gradient-to-tr from-neutral-900/80 to-neutral-800 text-white">
        <Form
          className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-700/40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center py-4 text-3xl font-semibold">Sing in</h2>

          <AuthFormGroup label="Email" htmlFor="email" error={errors.email}>
            <input
              className="input-data-auth"
              type="email"
              placeholder="Email adress"
              id="email"
              name="email"
              disabled={isLogging}
              {...register("email")}
            />
          </AuthFormGroup>

          <AuthFormGroup label="Password" htmlFor="password" error={errors.password}>
            <input
              className="input-data-auth"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              disabled={isLogging}
              {...register("password")}
            />
          </AuthFormGroup>

          <div className="flex gap-2 mt-3">
            <p>Don't have an account yet?</p>
            <Link className="underline text-blue-500 hover:text-blue-600 transition-all" to="/signup">
              Go signup
            </Link>
          </div>

          <div className="flex gap-2 mb-3">
            <p>Did you forgot your password?</p>
            <Link className="underline text-blue-500 hover:text-blue-600 transition-all" to="/forgot-password">
              reset password
            </Link>
          </div>

          <FillButton type="submit" disabled={isLogging}>
            {isLogging ? "Loading..." : "Submit"}
          </FillButton>
        </Form>
      </div>
    </>
  );
}

export default Signin;
