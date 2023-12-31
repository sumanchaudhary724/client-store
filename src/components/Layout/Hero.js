import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import pants from "../../assets/a.jpg";
import jacket from "../../assets/b.jpg";
import sweater from "../../assets/a.jpg";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        margin: 2,
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: 250,
          width: 200,
          display: "flex",

          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Just Landed</Typography>
        <Typography variant="caption">
          Be the first to shop our latest products
        </Typography>
        <Link to="/" className="nav-link">
          Shop the latest
        </Link>{" "}
      </Paper>
      <Paper sx={{ height: 250, width: 200 }}>
        <img
          className="image"
          src={pants}
          alt=""
          height={250}
          width={200}
          style={{ objectFit: "cover" }}
        />
      </Paper>
      <Paper sx={{ height: 250, width: 200 }}>
        <img className="image" src={jacket} alt="" height={250} width={200} />
      </Paper>
      <Paper sx={{ height: 250, width: 200 }}>
        <img className="image" src={sweater} alt="" height={250} width={200} />
      </Paper>
    </Box>
  );
};
