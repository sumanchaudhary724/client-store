import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DrawerAppBar from "./DrawerAppBar";

export const Header = () => {
  const { user } = useSelector((store) => store.userInfo);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { md: "row-reverse", xs: "row-reverse", lg: "column" },
        alignItems: "center",
      }}
      className="header shadow"
    >
      <DrawerAppBar />
      <Box
        sx={{
          display: "flex",
          p: 1,
          justifyContent: "space-between",
          width: { sm: "100%", md: "80%" },
        }}
      >
        <Box
          sx={{
            flexGrow: 3,
            textAlign: "left",
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          <Link className="nav-link" to="/">
            <Typography variant="h5" mt={1}>
              Footwears
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            flexGrow: 2,
            display: "flex",
            justifyContent: "end",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
