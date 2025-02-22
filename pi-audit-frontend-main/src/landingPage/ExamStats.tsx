import React, { useState } from "react";
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, MenuItem, Select, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const examData = [
  { name: "Registered Students", value: 120, color: "#0088FE" },
  { name: "Exam Attended", value: 95, color: "#00C49F" },
  { name: "Passed", value: 75, color: "#FFBB28" },
  { name: "Failed", value: 20, color: "#FF8042" },
];

const ExamStats = () => {
  const [filter, setFilter] = useState("thisMonth");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Exam Statistics</Typography>
      
      {/* Date Range Filter */}
      <Select value={filter} onChange={handleFilterChange} sx={{ mb: 2, minWidth: 200 }}>
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="thisWeek">This Week</MenuItem>
        <MenuItem value="lastWeek">Last Week</MenuItem>
        <MenuItem value="thisMonth">This Month</MenuItem>
        <MenuItem value="lastMonth">Last Month</MenuItem>
        <MenuItem value="custom">Custom Date Range</MenuItem>
      </Select>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={270}>
        <PieChart>
          <Pie data={examData} cx="50%" cy="40%" outerRadius={100} fill="#8884d8" dataKey="value">
            {examData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Tabular Data */}
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Count</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExamStats;
