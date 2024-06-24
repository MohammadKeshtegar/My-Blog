import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteUser } from "./useDeleteUser";
import UserPhoto from "../../ui/UserPhoto";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";

function UserRow({ user: { _id: userId, name, email, active, photo, createdAt } }) {
  const { isDeletingUser, deleteUser } = useDeleteUser();

  const defaultPhoto = photo.includes("default");

  return (
    <Table.Row rowStyle="bg-neutral-700/50 grid-cols-6">
      <div className="flex justify-center">
        <UserPhoto photoStyle="h-14 rounded-full" photoUrl={!defaultPhoto ? `http://127.0.0.1:3000/images/users/${photo}` : "/default-user.png"} />
      </div>
      <div>{name}</div>
      <div>{email}</div>

      <div className="flex justify-center">
        {active ? <FaRegCircleCheck className="text-emerald-500" /> : <IoCloseCircleOutline className="text-red-500 text-xl" />}
      </div>

      <div>{new Date(createdAt).toLocaleDateString()}</div>

      <div>
        <Modal>
          <Modal.Open opens="delete-user">
            <button className="border p-1 rounded hover:text-red-500 hover:border-red-500 transition-all">
              <FiTrash2 />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-user">
            <ConfirmDelete onConfirm={() => deleteUser(userId)} resourceName="user" value={name} disabled={isDeletingUser} />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UserRow;

// "flex justify-center"
