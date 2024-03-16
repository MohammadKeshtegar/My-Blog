import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Form, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";

import "react-quill/dist/quill.snow.css";

import { useCreatePost } from "./useCreatePost";
import FillButton from "../../ui/FillButton";
import { useUpdatePost } from "./useUpdatePost";

function CreatePost() {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");
  const { state: PostToEdit } = useLocation();
  const { postId: editId, ...editValues } = PostToEdit || {};
  const { isCreatingPost, createPost } = useCreatePost();
  const { isUpdatingPost, updatePost } = useUpdatePost();
  const quill = useRef(null);

  const isEditSession = Boolean(editId);
  const isWorking = isCreatingPost || isUpdatingPost;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  useEffect(
    function () {
      if (isEditSession) setContent(editValues.description);
    },
    [isEditSession, editValues.description]
  );

  useEffect(
    function () {
      if (isEditSession) {
        if (editValues.imageCover.includes("default-post")) {
          setFile("/default-post.png");
        } else {
          setFile(`http://127.0.0.1:3000/images/posts/${editValues.imageCover}`);
        }
      }
    },
    [isEditSession, editValues.imageCover]
  );

  const { errors } = formState;

  function onSubmit(data) {
    let description = content.replace("<p><br></p>", "");

    if (description.length === 0) toast.error("The post must have a content!");

    const postData = { ...data, description };

    if (isEditSession) updatePost({ id: editId, updatedPost: postData });
    else
      createPost(
        { ...postData },
        {
          onSuccess: () => {
            reset();
            setFile("");
            setContent("");
          },
        }
      );
  }

  function onError(err) {
    console.error(err);
  }

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  if (errors) {
    const errorObj = Object.values(errors);
    errorObj.forEach((errMsg) => {
      toast.error(errMsg.message);
    });
  }

  return (
    <div className="shadow-md rounded-md p-4 bg-neutral-900/80 w-full flex flex-col">
      <Form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <div className="grid grid-cols-3 grid-rows-2 grid-flow-row-dense items-center gap-4 w-full justify-between min-h-10">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
              className="input-data-update placeholder:text-neutral-400 w-full"
            />
          </div>

          <div>
            <select
              name="Category"
              id="Category"
              {...register("category", { required: "Category is required" })}
              className="bg-neutral-600 rounded w-full p-2 focus:ring-1 border-none focus:ring-emerald-500 focus:outline-none focus:border-none placeholder:text-neutral-400"
            >
              <option value="html">Html</option>
              <option value="css">Css</option>
              <option value="javascript">Javascript</option>
              <option value="react">React</option>
              <option value="django">Django</option>
              <option value="nodejs">Nodejs</option>
              <option value="react-nodejs">React Nodejs</option>
              <option value="react-django">React Django</option>
              <option value="html-css-javascript">Html Css Javascript</option>
            </select>
          </div>

          <div className="col-span-2 relative">
            <input
              type="text"
              placeholder="A short description"
              {...register("shortDescription", {
                required: "Short description is required",
                minLength: { value: 10, message: "Sortdescription must be at least 10 characters" },
              })}
              className="input-data-update placeholder:text-neutral-400 w-full"
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              {...register("imageCover", { required: false })}
              onChange={handleChange}
              className="bg-neutral-600 input-file rounded cursor-pointer text-neutral-400 focus:ring-[2px] focus:ring-emerald-600 focus:border-none focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-emerald-500 rounded-md min-h-80 my-5 flex items-center justify-center flex-col">
          {file ? (
            <img src={file} alt="post" className="object-center" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-8xl opacity-20 text-emerald-500" />
              <p className="text-neutral-700">No image uploaded</p>
            </>
          )}
        </div>

        <div className="h-72">
          <ReactQuill
            theme="snow"
            className="h-72 text-xl text-neutral-300"
            placeholder="Text..."
            value={content}
            onChange={(val) => setContent(val)}
            ref={quill}
          />
        </div>

        <div>
          <FillButton disabled={isWorking} type="submit" buttonStyles="mt-16 w-full">
            {isWorking ? "Loading..." : isEditSession ? "Update" : "Create"}
          </FillButton>
        </div>
      </Form>
    </div>
  );
}

export default CreatePost;
