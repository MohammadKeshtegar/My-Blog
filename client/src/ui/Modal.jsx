import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";
import BorderButton from "./BorderButton";

const ModadlContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return <ModadlContext.Provider value={{ close, open, openName }}>{children}</ModadlContext.Provider>;
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModadlContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModadlContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed w-full h-screen backdrop-blur-sm top-0 left-0 transition-all z-[1000]">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-4 text-white border-neutral-500 border rounded">
        <div className="flex justify-end">
          <BorderButton btnStyle="close" handleClick={close}>
            <GrClose />
          </BorderButton>
        </div>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
