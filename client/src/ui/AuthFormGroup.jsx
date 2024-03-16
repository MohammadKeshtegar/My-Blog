import AuthFormLabel from "./AuthFormLabel";

function AuthFormGroup({ children, label, htmlFor, error }) {
  return (
    <div className="flex flex-col justify-between mb-1">
      <AuthFormLabel htmlFor={htmlFor}>{label}</AuthFormLabel>
      {children}
      {error && <div className="bg-red-500 text-red-400">{error}</div>}
    </div>
  );
}

export default AuthFormGroup;
