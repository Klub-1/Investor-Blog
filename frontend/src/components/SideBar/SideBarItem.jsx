import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import AuthStore from "../../stores/AuthStore";
import { useEffect } from "react";

// SOURCES:
// www.youtube.com/watch?v=SLfhMt5OUPI&t=761s&ab_channel=WebDevSimplified

export const SideBarItem = observer(({ item }) => {
  const resolvedPath = useResolvedPath(item.route);
  const isActive = useMatch(resolvedPath.pathname);

  useEffect(() => {
    AuthStore.checkAuth();
  }, []);

  if (item.unAuth || AuthStore.isAuth) {
    return (
      <Link
        className={
          "rounded-full p-2 " + (isActive ? "bg-[#EFF2F9]" : "bg-white")
        }
        to={item.route}
      >
        <div className="text-2xl">{item.icon}</div>
      </Link>
    );
  } else {
    return null;
  }
});
