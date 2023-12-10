import React from "react";
import { NavLink } from "react-router-dom";

const SidebarIcon = ({ to, icon, text, isActive, handleClick }) => {
  return (
    <NavLink
      to={to}
      className={`relative flex items-center font-bold text-xl justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-800 text-green-500 rounded-3xl shadow-lg hover:bg-green-600 hover:text-white hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer group ${
        isActive ? "bg-green-600 text-white rounded-xl" : ""
      }`}
      onClick={handleClick}
    >
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </NavLink>
  );
};

export default SidebarIcon;
