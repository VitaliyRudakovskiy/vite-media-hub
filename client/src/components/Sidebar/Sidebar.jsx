import React, { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import {
  FaNewspaper,
  FaHeart,
  FaHome,
  FaUserFriends,
  FaCog,
} from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveIndex = () => {
    switch (location.pathname) {
      case "/cards":
        return 0;
      case "/home":
        return 1;
      case "/likes":
        return 2;
      case "/bookmarks":
        return 3;
      case "/subscriptions":
        return 4;
      case "/settings":
        return 5;
      default:
        return null;
    }
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  const handleItemClick = (index) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        navigate("/cards");
        break;
      case 1:
        navigate("/home");
        break;
      case 2:
        navigate("/likes");
        break;
      case 3:
        navigate("/bookmarks");
        break;
      case 4:
        navigate("/subscriptions");
        break;
      case 5:
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed left-0 h-screen w-16 m-0 pt-[4rem] flex flex-col bg-sidebar text-white z-50">
      <SidebarIcon
        icon={<FaNewspaper size="28" />}
        text="News Feed"
        isActive={activeIndex === 0}
        handleClick={() => handleItemClick(0)}
      />
      <SidebarIcon
        icon={<FaHome size="28" />}
        text="Home"
        isActive={activeIndex === 1}
        handleClick={() => handleItemClick(1)}
      />
      <SidebarIcon
        icon={<FaHeart size="28" />}
        text="Favourite cards"
        isActive={activeIndex === 2}
        handleClick={() => handleItemClick(2)}
      />
      <SidebarIcon
        icon={<BsFillBookmarksFill size="28" />}
        text="Bookmarks"
        isActive={activeIndex === 3}
        handleClick={() => handleItemClick(3)}
      />
      <SidebarIcon
        icon={<FaUserFriends size="28" />}
        text="Subscriptions"
        isActive={activeIndex === 4}
        handleClick={() => handleItemClick(4)}
      />
      <SidebarIcon
        icon={<FaCog size="28" />}
        text="Settings"
        isActive={activeIndex === 5}
        handleClick={() => handleItemClick(5)}
      />
      <SidebarIcon icon={"RU"} text="Language" />
    </div>
  );
};

export default SideBar;
