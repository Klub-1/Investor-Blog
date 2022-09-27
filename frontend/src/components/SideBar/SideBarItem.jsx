import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

// SOURCES:
// www.youtube.com/watch?v=SLfhMt5OUPI&t=761s&ab_channel=WebDevSimplified

export const SideBarItem = ({ route, content }) => {
  const resolvedPath = useResolvedPath(route);
  const isActive = useMatch(resolvedPath.pathname);
  return (
    <Link
      style={{
        background: isActive ? "#EFF2F9" : "white",
        borderRadius: "20px",
        padding: "5px",
      }}
      to={route}
    >
      {content}
    </Link>
  );
};
