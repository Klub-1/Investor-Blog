import React from "react";

import { SideBarItems } from "../../Data/SideBarItems";
import { SideBarItem } from "./SideBarItem";

export const SideBar = () => {
  return (
    <div className="h-[400px] w-[60px] mt-5 md:mt-10 bg-white shadow rounded-r-lg flex flex-col justify-evenly items-center">
      {SideBarItems.map((item) => (
        <SideBarItem item={item} />
      ))}
    </div>
  );
};
