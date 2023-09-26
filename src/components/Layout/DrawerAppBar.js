import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../helper/axios";
import { setUser } from "../../pages/signin-signup/userSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartDrawer } from "../cart/CartDrawer";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // State for the cart drawer
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const calculateTotalItems = () => {
    let totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.orderQty;
    });
    return totalItems;
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen((prevState) => !prevState); // Toggle cart drawer state
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);

  const handleOnLogout = () => {
    // Log out from the server by removing the access and refresh JWTs
    logoutUser(user._id);

    // Clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // Reset the store
    dispatch(setUser({}));
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Footwears
          </Typography>
          {/* Add the shopping cart icon here */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={handleCartDrawerToggle} // Open the cart drawer when clicked
          >
            <ShoppingCartIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          {user?._id ? (
            <>
              <Button
                color="inherit"
                onClick={handleOnLogout}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/sign-in"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <CartDrawer
        isOpen={cartDrawerOpen}
        toggleDrawer={handleCartDrawerToggle}
        totalItems={calculateTotalItems()}
      />
    </Box>
  );
}

export default DrawerAppBar;
