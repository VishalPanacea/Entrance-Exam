import { Drawer, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Students", icon: <PeopleIcon />, path: "/student" },
  { text: "Results", icon: <AssignmentIcon />, path: "/exam" },
  { text: "Questions", icon: <QuizIcon />, path: "/questions" },
  { text: "Admins", icon: <AdminPanelSettingsIcon />, path: "/admin" },
];

const Sidebar = () => {
  const location = useLocation(); // Get the current path

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: "#1E293B", color: "white" },
      }}
    >
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={path}
            selected={location.pathname === path} // Highlight active menu item
            sx={{
              "&.Mui-selected": { backgroundColor: "#475569", color: "#fff" },
              "&:hover": { backgroundColor: "#64748B" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
