import React, { useState } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";

import {
  IconButton,
  List,
  Link,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Button,
  Box,
  Typography,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Logout,
  Settings,
  PersonAdd,
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";

import FlexBetween from "components/Layout/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "globalStore";
import profileImage from "assets/profile.jpeg";
import { usePostSignoutMutation } from "globalStore/dashboardApi.js";

const Navbar = ({ user, checkLoggedIn, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [postSignout, { isLoading, isError, error, isSuccess }] =
    usePostSignoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [active, setActive] = useState("");
  const open = Boolean(anchorEl);

  const handleLogoff = (e) => {
    e.preventDefault();
    // cookies.remove("token");
    // cookies.remove("access-token");
    // cookies.remove("refresh-token");
    // cookies.remove("access-token");
    postSignout()
      .unwrap()
      .then((response) => {
        console.log("RESP1:", response);
        navigate("/signin");
      })
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/addProduct");
                  // setActive(Products);
                }}
              >
                Products
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate("/checkout");
                  // setActive(Products);
                }}
              >
                Checkout
              </ListItemButton>
            </ListItem>
          </List>
        </FlexBetween>
        {/* RIGHT SIDE */}

        <FlexBetween gap="1.5rem">
          {/* **THEME** */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* **SETTINGS** */}
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            {/* <Link href="/signout" color="inherit"> */}
            <MenuItem onClick={handleLogoff}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
            {/* </Link> */}
          </Menu>
          {/* **LOGGED IN USER NAVIGATION** */}
          {(checkLoggedIn || user) && (
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.firstName}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={handleClose}>
                  <LockPersonOutlinedIcon />
                </MenuItem>
              </Menu>
            </FlexBetween>
          )}

          {/* **TO LOGIN/REGISTER USER** */}
          {!(checkLoggedIn || user) && (
            <NavLink to="/signin">
              <IconButton>
                <LockOpenOutlinedIcon />
              </IconButton>
            </NavLink>
          )}
          {!(checkLoggedIn || user) && (
            <NavLink to="/signup">
              <IconButton>
                <LockOutlinedIcon />
              </IconButton>
            </NavLink>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
