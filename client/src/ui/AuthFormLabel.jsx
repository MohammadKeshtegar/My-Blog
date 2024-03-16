function AuthFormLabel({ children, htmlFor }) {
  return (
    <label className="pl-1 font-semibold text-neutral-400 mb-1" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default AuthFormLabel;
