import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useSingup } from "../featues/authentication/useSignup";
import AuthFormGroup from "../ui/AuthFormGroup";
import FillButton from "../ui/FillButton";

function Signup() {
  const { isSigningup, signup } = useSingup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    signup({ ...data });
  }

  return (
    <>
      <div className="h-screen grid place-items-center bg-neutral-900/95 bg-gradient-to-tr from-neutral-900/80 to-neutral-800 text-white">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 rounded-md p-5 flex flex-col gap-4 shadow-md bg-neutral-700/40"
        >
          <h2 className="text-center py-4 text-3xl font-semibold">Sing up</h2>

          <AuthFormGroup label="Username" htmlFor="username" error={errors?.name}>
            <input
              className="input-data-auth"
              type="text"
              placeholder="Username"
              id="username"
              {...register("name")}
              disabled={isSigningup}
            />
          </AuthFormGroup>

          <AuthFormGroup label="Email" htmlFor="email" error={errors?.email}>
            <input
              className="input-data-auth"
              type="email"
              placeholder="Email adrress"
              id="email"
              {...register("email")}
              disabled={isSigningup}
            />
          </AuthFormGroup>

          <AuthFormGroup label="Password" htmlFor="password" error={errors?.password}>
            <input
              className="input-data-auth"
              type="password"
              placeholder="Password"
              id="password"
              {...register("password")}
              disabled={isSigningup}
            />
          </AuthFormGroup>

          <AuthFormGroup label="Confirm password" htmlFor="confirmPassword" error={errors?.confirmPassword}>
            <input
              className="input-data-auth"
              type="password"
              placeholder="Confirm Password"
              id="confirm-password"
              {...register("confirmPassword")}
              disabled={isSigningup}
            />
          </AuthFormGroup>

          <div className="flex gap-2 my-3">
            <p>Already have an account?</p>
            <Link className="underline text-blue-500 hover:text-blue-600 transition-all" to="/signin">
              Go signin
            </Link>
          </div>

          <FillButton type="submit" disabled={isSigningup}>
            {isSigningup ? "Loading..." : "Submit"}
          </FillButton>
        </Form>
      </div>
    </>
  );
}

export default Signup;
