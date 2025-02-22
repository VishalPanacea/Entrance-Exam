import React, { useState } from "react";
import { Box, Button, Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const dummyAdmins = [
  { id: 1, name: "Admin One", createdAt: "2025-01-01", questionsCreated: 10, status: "Active" },
  { id: 2, name: "Admin Two", createdAt: "2025-02-01", questionsCreated: 5, status: "Inactive" }
];

const SuperAdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "default123" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event, admin) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdmin(admin);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Create Admin</Button>
      </Box>
      <Table sx={{ minWidth: 650, border: "1px solid #ddd" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Created Date</strong></TableCell>
            <TableCell><strong>Questions Created</strong></TableCell>
            <TableCell><strong>Access Status</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyAdmins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.createdAt}</TableCell>
              <TableCell>{admin.questionsCreated}</TableCell>
              <TableCell sx={{ color: admin.status === "Active" ? "green" : "red" }}>{admin.status}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleMenuClick(event, admin)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Admin</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Admin Name" fullWidth value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
          <TextField margin="dense" label="Email ID" fullWidth value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
          <TextField margin="dense" label="Default Password" fullWidth value={newAdmin.password} disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color="primary">Create</Button>
        </DialogActions>
      </Dialog>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => alert(`Editing ${selectedAdmin?.name}`)}>Edit</MenuItem>
        <MenuItem onClick={() => alert(`Toggling status for ${selectedAdmin?.name}`)}>{selectedAdmin?.status === "Active" ? "Deactivate" : "Activate"}</MenuItem>
      </Menu>
    </Box>
  );
};

export default SuperAdminDashboard;
