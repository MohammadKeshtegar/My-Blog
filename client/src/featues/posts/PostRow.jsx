import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";

import ConfirmDelete from "../../ui/ConfirmDelete";
import { limitText } from "../../utils/limitText";
import { useDeletePost } from "./useDeletePost";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import PostImage from "../../ui/PostImage";

function PostRow({
  post: { _id: postId, imageCover, title, shortDescription, category, createdAt, updatedAt, description },
}) {
  const { deletePost, isDeletingPost } = useDeletePost();

  const defaultImage = imageCover.startsWith("imageCover");

  return (
    <Table.Row rowStyle="bg-neutral-700/50">
      <div>
        <PostImage defaultImage={defaultImage} imageCover={imageCover} styles="w-24" />
      </div>
      <div>{title.length > 10 ? `${limitText(title)}...` : title}</div>
      <div>{shortDescription.length > 20 ? `${limitText(shortDescription)}...` : shortDescription}</div>
      <div>{category}</div>

      <div>{createdAt ? new Date(createdAt).toLocaleDateString() : "_"}</div>
      <div>{updatedAt ? new Date(updatedAt).toLocaleDateString() : "_"}</div>

      <div>
        <Modal>
          <Modal.Open opens="delete-user">
            <button className="border p-1 rounded hover:text-red-500 hover:border-red-500 transition-all">
              <FiTrash2 />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-user">
            <ConfirmDelete
              onConfirm={() => deletePost(postId)}
              resourceName="post"
              value={title}
              disabled={isDeletingPost}
            />
          </Modal.Window>
        </Modal>
      </div>

      <div>
        <button className="border p-1 rounded hover:text-emerald-500 hover:border-emerald-500 transition-all">
          <Link
            to="/admin/create-post"
            state={{
              postId,
              imageCover,
              title,
              shortDescription,
              category,
              createdAt,
              updatedAt,
              description,
            }}
          >
            <FaPen />
          </Link>
        </button>
      </div>
    </Table.Row>
  );
}

export default PostRow;
