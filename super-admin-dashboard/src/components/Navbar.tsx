import { AppBar, Toolbar, Typography, Menu, MenuItem, Avatar, Box } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { role, setRole } = useAuth(); // Get user role from context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open menu on avatar click
  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout action
  const handleLogout = () => {
    setRole(null);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        backgroundColor: "#1E293B", // Dark blue theme
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
        {/* LOGO / TITLE */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Super Admin Dashboard
        </Typography>

        {/* USER AVATAR */}
        <Box
          onClick={handleMenuOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          <Avatar sx={{ bgcolor: "#3B82F6", color: "white", marginRight: 1 }}>
            {role?.charAt(0).toUpperCase() || "S"}
          </Avatar>
          <Typography sx={{ color: "white", fontSize: "14px" }}>{role || "SuperAdmin"}</Typography>
        </Box>

        {/* DROPDOWN MENU */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1 }}
          MenuListProps={{ sx: { padding: "5px 10px" } }}
        >
          <MenuItem onClick={handleLogout} sx={{ color: "#DC2626", fontWeight: "500" }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
