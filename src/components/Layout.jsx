import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/students", label: "Students" },
    { path: "/drives", label: "Drives" },
    { path: "/reports", label: "Reports" },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="flex h-screen">
      {/* AppBar with Hamburger Menu */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1E3A8A" }}> {/* Tailwind's blue-800 */}
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vaccination Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#1E3A8A", // Tailwind's blue-800
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Vaccination Portal
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#2563EB", // Tailwind's blue-600
                  "&:hover": {
                    backgroundColor: "#1D4ED8", // Tailwind's blue-700
                  },
                },
                "&:hover": {
                  backgroundColor: "#1D4ED8", // Tailwind's blue-700
                },
              }}
              onClick={toggleDrawer(false)} // Close drawer on link click
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={() => {
            logout();
            setDrawerOpen(false); // Close drawer on logout
          }}
          variant="contained"
          color="error"
          sx={{
            margin: "16px",
          }}
        >
          Logout
        </Button>
      </Drawer>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: "16px",
          backgroundColor: "#1E293B", // Tailwind's gray-800 for dark mode
          color: "white",
          overflowY: "auto",
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
