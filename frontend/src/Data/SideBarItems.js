import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineUser,
} from "react-icons/ai";

export const SideBarItems = [
  {
      id:1,
    title: "Home",
    route: "/",
    icon: <AiOutlineHome />,
  },

  {
      id:2,
    title: "Add",
    route: "/add",
    icon: <AiOutlinePlus />,
  },

  {
      id:3,
    title: "Search",
    route: "/search",
    icon: <AiOutlineSearch />,
  },

  {
      id:4,
    title: "Stocks",
    route: "/stocks",
    icon: <AiOutlineBarChart />,
  },

  {
      id:5,
    title: "Account",
    route: "/account",
    icon: <AiOutlineUser />,
  },
];
