import React from "react";
import Grid from "@mui/material/Grid";

import { SideBarItem } from "./SideBarItem";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const iconStyle = {
  iconColor: "black",
  iconHeight: "30px",
  iconWidth: "30px",
  iconMinHeight: "24px",
  iconMinWidth: "24px",
};

export const SideBar = () => {
  return (
    <Grid
      style={{
        height: "50%",
        width: "60px",
        minWidth: "40px",
        background: "white",
        position: "absolute",
        left: "0px",
        boxSadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "0px 20px 20px 0px",
      }}
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <SideBarItem
        route="/"
        content={
          <HomeOutlinedIcon
            sx={{
              color: iconStyle.iconColor,
              height: iconStyle.iconHeight,
              width: iconStyle.iconWidth,
              minHeight: iconStyle.iconMinHeight,
              minWidth: iconStyle.iconMinWidth,
            }}
          />
        }
      />

      <SideBarItem
        route="/add"
        content={
          <AddOutlinedIcon
            sx={{
              color: iconStyle.iconColor,
              height: iconStyle.iconHeight,
              width: iconStyle.iconWidth,
              minHeight: iconStyle.iconMinHeight,
              minWidth: iconStyle.iconMinWidth,
            }}
          />
        }
      />

      <SideBarItem
        route="/search"
        content={
          <SearchOutlinedIcon
            sx={{
              color: iconStyle.iconColor,
              height: iconStyle.iconHeight,
              width: iconStyle.iconWidth,
              minHeight: iconStyle.iconMinHeight,
              minWidth: iconStyle.iconMinWidth,
            }}
          />
        }
      />

      <SideBarItem
        route="/stocks"
        content={
          <LineAxisOutlinedIcon
            sx={{
              color: iconStyle.iconColor,
              height: iconStyle.iconHeight,
              width: iconStyle.iconWidth,
              minHeight: iconStyle.iconMinHeight,
              minWidth: iconStyle.iconMinWidth,
            }}
          />
        }
      />

      <SideBarItem
        route="/account"
        content={
          <PersonOutlineOutlinedIcon
            sx={{
              color: iconStyle.iconColor,
              height: iconStyle.iconHeight,
              width: iconStyle.iconWidth,
              minHeight: iconStyle.iconMinHeight,
              minWidth: iconStyle.iconMinWidth,
            }}
          />
        }
      />
    </Grid>
  );
};
