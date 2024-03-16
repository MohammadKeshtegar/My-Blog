function PaginationButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-7 w-10 hover:bg-emerald-400 flex items-center justify-center transition-all"
    >
      {children}
    </button>
  );
}

export default PaginationButton;
