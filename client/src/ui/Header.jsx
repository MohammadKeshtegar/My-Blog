import { Link, NavLink, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { TbLogin2 } from "react-icons/tb";
import { useState } from "react";

import UserPhoto from "./UserPhoto";
import DropDown from "./DropDown";
import Search from "./Search";

function Header() {
  const [arrowDown, setArrowDown] = useState(false);
  const { email, name, photo } = useSelector((state) => state.user);
  const url = useLocation();

  function handleToggle(e) {
    e.stopPropagation();
    setArrowDown((down) => !down);
  }

  const defaultImage = photo.includes("default");

  return (
    <div className={`border-b-2 bg-neutral-800 border-emerald-500 py-3 px-4 h-[67px]`}>
      <nav className="flex justify-between items-center w-full relative">
        <NavLink to="/">
          <img src="/MB.png" alt="Logo" className="h-11 ml-5" />
        </NavLink>

        {url.pathname === "/posts" && <Search />}

        {email ? (
          <div className="flex items-center gap-1 min-w-[170px] relative">
            <div
              className={`flex items-center gap-2 hover:bg-neutral-700 px-2 py-1 rounded-md cursor-pointer transition-all w-full  justify-between ${
                arrowDown ? "bg-neutral-700" : ""
              }`}
              onClick={handleToggle}
            >
              <div className="flex items-center gap-2">
                <UserPhoto
                  photoStyle="h-9 rounded-full"
                  photoUrl={!defaultImage ? `http://127.0.0.1:3000/images/users/${photo}` : "/default-user.png"}
                />
                <span className="cursor-pointer text-ellipsis">{name}</span>
              </div>
              {arrowDown ? <IoIosArrowDown className="rotate-180 transition-all" /> : <IoIosArrowDown className="transition-all" />}
            </div>

            {arrowDown && <DropDown setArrowDown={setArrowDown} />}
          </div>
        ) : (
          <div className="flex ">
            <Link
              to="/signup"
              className="bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center gap-2 px-3 py-2 border-emerald-500 border-2 text-white rounded-md mr-2"
            >
              Sign up
            </Link>
            <Link
              to="/signin"
              className="hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 px-3 py-2 border-emerald-500 border-2 text-white rounded-md mr-2"
            >
              Sign in <TbLogin2 />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
