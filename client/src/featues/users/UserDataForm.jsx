import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { useUpdateUser } from "../users/useUpdateUser";
import SubmitButton from "../../ui/SubmitButton";
import FormRow from "../../ui/FormIRow";

function UserDataForm({ setFile }) {
  const { name, email } = useSelector((state) => state.user);
  const { handleSubmit, register } = useForm({
    defaultValues: email ? { name, email } : {},
  });
  const { isUpdatingUser, updateUser } = useUpdateUser();

  function onSubmitData(data) {
    updateUser(data);
  }

  function handlePhoto(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="py-5 px-2 flex flex-col items-center justify-center border-b-2 border-neutral-500 h-1/2">
      <Form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-4 w-2/3">
        <FormRow htmlFor="name" text="Username">
          <input type="text" name="name" id="name" className="input-data-update" {...register("name")} />
        </FormRow>
        <FormRow htmlFor="email" text="Email">
          <input type="email" name="email" id="email" className="input-data-update" {...register("email")} />
        </FormRow>
        <FormRow htmlFor="photo" text="User photo">
          <input
            type="file"
            accept="image/*"
            id="photo"
            className="bg-neutral-600 input-file rounded cursor-pointer text-neutral-400 focus:ring-[2px] focus:ring-emerald-600 focus:border-none focus:outline-none w-[195px]"
            {...register("photo")}
            onChange={handlePhoto}
          />
        </FormRow>
        <SubmitButton disabled={isUpdatingUser}>{isUpdatingUser ? "Loading..." : "Update"}</SubmitButton>
      </Form>
    </div>
  );
}

export default UserDataForm;
