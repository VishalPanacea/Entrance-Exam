import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const SuperAdminDashboard = () => {
  const theme = useTheme();
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "default123" });

  // Fetch Admins from Backend
  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/admin/admins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Create New Admin
  const handleCreateAdmin = async () => {
    try {
      await axios.post("http://localhost:5005/api/admin/register", newAdmin);
      fetchAdmins(); // Refresh list after creation
      handleClose();
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAdmin({ name: "", email: "", password: "default123" });
  };

  const handleMenuClick = (event, admin) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdmin(admin);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "155%",
        overflowX: "auto",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mb: 2, textTransform: "none" }}>
        Create Admin
      </Button>

      <Table
        sx={{
          width: "100%",
          minWidth: 650,
          borderRadius: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
            {["Name", "Email", "Role", "Created Date", "Questions Created", "Access Status", "Actions"].map((head) => (
              <TableCell key={head} sx={{ fontWeight: "bold", color: theme.palette.primary.contrastText }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin._id} sx={{ "&:nth-of-type(even)": { backgroundColor: theme.palette.action.hover } }}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>{new Date(admin.createdDate).toLocaleString()}</TableCell>
              <TableCell>{admin.questionsCreated}</TableCell>
              <TableCell
                sx={{
                  color: admin.accessStatus === "Active" ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: "bold",
                }}
              >
                {admin.accessStatus}
              </TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleMenuClick(event, admin)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: 3 } }}>
        <DialogTitle>Create Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Name"
            fullWidth
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email ID"
            fullWidth
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          />
          <TextField margin="dense" label="Default Password" fullWidth value={newAdmin.password} disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateAdmin} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => alert(`Editing ${selectedAdmin?.name}`)}>Edit</MenuItem>
        <MenuItem onClick={() => alert(`Toggling status for ${selectedAdmin?.name}`)}>
          {selectedAdmin?.status === "Active" ? "Deactivate" : "Activate"}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SuperAdminDashboard;
