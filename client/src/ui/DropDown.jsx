import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

import { useLogout } from "../featues/authentication/useLogout";
import { useOnClickOutSide } from "../hooks/useOnClickOutSide";
import SidebarItem from "./SidebarItem";

function DropDown({ setArrowDown }) {
  const close = () => setArrowDown(false);
  const ref = useOnClickOutSide(close, false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  }

  return (
    <div ref={ref} className="bg-neutral-700 absolute top-[48px] p-1 rounded-md w-full z-10 shadow">
      <ul className="flex flex-col gap-1">
        <SidebarItem closeDropDown={close} path="/profile" icon={<FaUserCircle />} type="dropdown">
          Profile
        </SidebarItem>

        <button
          className="hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 p-1 rounded"
          onClick={handleLogout}
        >
          <TbLogout2 />
          Logout
        </button>
      </ul>
    </div>
  );
}

export default DropDown;
