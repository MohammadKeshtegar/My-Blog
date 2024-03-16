import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import UserPasswordForm from "../featues/users/UserPasswordForm";
import UserDataForm from "../featues/users/UserDataForm";
import { useState } from "react";
import UserPhoto from "../ui/UserPhoto";

function Profile() {
  const [file, setFile] = useState();
  const { name, email, photo } = useSelector((state) => state.user);
  const defaultPhoto = photo.includes("default");
  if (!email) return redirect("/");

  return (
    <div className="shadow-md rounded-md p-4 bg-neutral-900/80 w-full h-full">
      <div className="flex h-full">
        <div className="mx-auto">
          <UserPhoto
            photoStyle="border-2 border-gray-200 h-36 w-36 rounded-full shadow-sm mb-14 mt-10 mx-auto"
            photoUrl={
              !defaultPhoto ? `http://127.0.0.1:3000/images/users/${photo}` : file ? file : "/default-user.png"
            }
          />

          <div className="grid grid-cols-2 gap-y-1">
            <div className="justify-self-center">
              <p>Name:</p>
              <p>Email:</p>
            </div>
            <div className="font-semibold">
              <p className="text-neutral-400">{name}</p>
              <p className="text-neutral-400">{email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-2 w-1/2 h-full bg-neutral-800/50 rounded-sm">
          <UserDataForm setFile={setFile} />
          <UserPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default Profile;
