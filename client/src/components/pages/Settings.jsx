import React from "react";
import Header from "../Header";
import SideBar from "../Sidebar/Sidebar";

const Settings = () => {
  return (
    <div className="flex flex-col items-start">
      <Header />
      <SideBar />
      <div className="pl-16">
        <h1>This is Settings</h1>
      </div>
    </div>
  );
};

export default Settings;
