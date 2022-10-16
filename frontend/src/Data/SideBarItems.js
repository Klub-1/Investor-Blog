import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineUser,
} from "react-icons/ai";

export const SideBarItems = [
  {
    title: "Home",
    route: "/",
    icon: <AiOutlineHome />,
  },

  {
    title: "Add",
    route: "/add",
    icon: <AiOutlinePlus />,
  },

  {
    title: "Search",
    route: "/search",
    icon: <AiOutlineSearch />,
  },

  {
    title: "Stocks",
    route: "/stocks",
    icon: <AiOutlineBarChart />,
  },

  {
    title: "Account",
    route: "/account",
    icon: <AiOutlineUser />,
  },
];
