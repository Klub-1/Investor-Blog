import {
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineBarChart,
  AiOutlineUser,
  AiFillTrophy,
} from "react-icons/ai";

export const SideBarItems = [
  {
    id: 1,
    title: "Home",
    route: "/",
    unAuth: true,
    icon: <AiOutlineHome />,
  },

  {
    id: 2,
    title: "Add",
    route: "/add",
    unAuth: false,
    icon: <AiOutlinePlus />,
  },

  {
    id: 3,
    title: "Search",
    route: "/search",
    unAuth: true,
    icon: <AiOutlineSearch />,
  },

  {
    id: 4,
    title: "Stocks",
    route: "/stocks",
    unAuth: true,
    icon: <AiOutlineBarChart />,
  },
  {
    id: 5,
    title: "Highscore",
    route: "/highscore",
    unAuth: true,
    icon: <AiFillTrophy />,
  },

  {
    id: 6,
    title: "Account",
    route: "/account",
    unAuth: true,
    icon: <AiOutlineUser />,
  },
];
