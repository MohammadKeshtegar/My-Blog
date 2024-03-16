function FormRow({ children, htmlFor, text }) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={htmlFor}>{text} :</label>
      {children}
    </div>
  );
}

export default FormRow;
