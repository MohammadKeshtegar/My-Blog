import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { BsFillFilePostFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";

import SidebarItem from "./SidebarItem";

function Sidebar() {
  const { email, role } = useSelector((state) => state.user);

  return (
    <div className="w-[21%] p-8 border-r-2 bg-gradient-to-tl from-neutral-900/80 to-neutral-800/90 border-emerald-500">
      <nav className="flex flex-col h-[calc(100%-1rem)] justify-between">
        <div className="divide-y-2">
          <ul>
            <SidebarItem path="/posts" icon={<BsFillFilePostFill />} type="sidebar">
              Posts
            </SidebarItem>
            <SidebarItem path="/favourite-posts" icon={<FaBookmark />} type="sidebar">
              Your favourites
            </SidebarItem>
            {email && (
              <SidebarItem path="/profile" icon={<FaUserCircle />} type="sidebar">
                Profile
              </SidebarItem>
            )}
          </ul>
          {role === "admin" && (
            <ul>
              <SidebarItem path="/admin/create-post" icon={<MdPostAdd />} type="sidebar">
                New Post
              </SidebarItem>
              <SidebarItem path="/admin/manage-posts" icon={<BsFillFileEarmarkPostFill />} type="sidebar">
                Manage posts
              </SidebarItem>
              <SidebarItem path="/admin/manage-users" icon={<FaUsers />} type="sidebar">
                Manage users
              </SidebarItem>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
