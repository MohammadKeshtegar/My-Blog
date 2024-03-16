function BorderButton({ children, handleClick, type, btnStyle }) {
  let style = "rounded border inline-block px-7 py-2 transition-colors focus:outline-none ";

  if (type === "submit")
    style = style + "mt-5 border-emerald-500 hover:bg-emerald-600 focus:ring focus:ring-emerald-500";

  if (btnStyle === "close")
    style = style + "border-emerald-500 hover:bg-emerald-600 focus:ring focus:ring-emerald-500";

  if (type === "button") style = style + "border-red-500 hover:bg-red-800 focus:ring focus:ring-red-500";

  return (
    <button className={style} onClick={handleClick} type={type}>
      {children}
    </button>
  );
}

export default BorderButton;
