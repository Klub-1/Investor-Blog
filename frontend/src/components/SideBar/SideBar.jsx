import React from "react";
import "./SideBar.css";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";

// ICONS
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LineAxisOutlinedIcon from "@mui/icons-material/LineAxisOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const SideBar = () => {
  return (
    <nav className="menu">
      <Grid
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          height: "100%",
          width: "100%",
        }}
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <IconButton>
          <HomeOutlinedIcon sx={{ fontSize: "100%", color: "black" }} />
        </IconButton>

        <IconButton>
          <AddOutlinedIcon sx={{ fontSize: "100%", color: "black" }} />
        </IconButton>

        <IconButton>
          <SearchOutlinedIcon sx={{ fontSize: "100%", color: "black" }} />
        </IconButton>

        <IconButton>
          <LineAxisOutlinedIcon sx={{ fontSize: "100%", color: "black" }} />
        </IconButton>

        <IconButton>
          <PersonOutlineOutlinedIcon sx={{ fontSize: "100%", color: "black" }} />
        </IconButton>
      </Grid>
    </nav>
  );
};
