import BorderButton from "./BorderButton";

function SubmitButton({ children, disabled }) {
  return (
    <div className="flex justify-end">
      <BorderButton type="submit" disabled={disabled}>
        {children}
      </BorderButton>
    </div>
  );
}

export default SubmitButton;
