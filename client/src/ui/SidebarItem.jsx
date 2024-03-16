import { NavLink } from "react-router-dom";

function SidebarItem({ children, icon, type, path, closeDropDown }) {
  let itemStyle = `hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2 `;

  if (type === "sidebar") itemStyle = itemStyle + `p-2 rounded-lg my-1`;

  if (type === "dropdown") itemStyle = itemStyle + `p-1 hover:bg-emerald-500 hover:text-white rounded-[4px]`;

  if (type === "dropdown")
    return (
      <li className={itemStyle} onClick={closeDropDown}>
        {icon}
        <NavLink to={path} className="inline w-full">
          {children}
        </NavLink>
      </li>
    );

  if (type === "sidebar")
    return (
      <li className={itemStyle}>
        {icon}
        <NavLink to={path} className="inline w-full">
          {children}
        </NavLink>
      </li>
    );
}

export default SidebarItem;
