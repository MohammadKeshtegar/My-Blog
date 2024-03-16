import BorderButton from "./BorderButton";
import FillButton from "./FillButton";

function ConfirmDelete({ resourceName, onCloseModal, disabled, onConfirm, value }) {
  return (
    <div className="w-[40rem] flex flex-col gap-4 border-neutral-500">
      <h3 className="text-xl">Delete {resourceName}</h3>
      <p>
        Are your sure your want to delete this {resourceName} ( {resourceName.toUpperCase()}:
        <span className="text-emerald-500"> {value}</span> )? This action cannot be undone!
      </p>

      <div className="flex items-center justify-end gap-4 mt-4">
        <FillButton type="button" handleClick={onCloseModal}>
          Cancel
        </FillButton>
        <BorderButton type="button" disabled={disabled} handleClick={onConfirm}>
          Delete
        </BorderButton>
      </div>
    </div>
  );
}

export default ConfirmDelete;
