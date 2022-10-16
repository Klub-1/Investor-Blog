import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

// SOURCES:
// www.youtube.com/watch?v=SLfhMt5OUPI&t=761s&ab_channel=WebDevSimplified

export const SideBarItem = ({ item }) => {
  const resolvedPath = useResolvedPath(item.route);
  const isActive = useMatch(resolvedPath.pathname);
  return (
    <Link
      className={"rounded-full p-2 " + (isActive ? "bg-[#EFF2F9]" : "bg-white")}
      to={item.route}
    >
      <div className="text-2xl">{item.icon}</div>
    </Link>
  );
};
