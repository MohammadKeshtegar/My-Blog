function FillButton({ children, type, handleClick, disabled, buttonStyles }) {
  return (
    <button
      className={`bg-emerald-500 hover:bg-emerald-400 transition-all py-2 px-3 rounded-sm text-white border-none focus:ring focus:ring-emerald-300 focus:border-none hover:shadow-md disabled:opacity-50 ${buttonStyles}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default FillButton;
