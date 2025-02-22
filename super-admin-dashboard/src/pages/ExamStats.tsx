import React, { useState } from "react";
import {
    Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper,
    MenuItem, Select, Typography, Card, CardContent
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const examData = [
    { name: "Registered Students", value: 120, color: "#4F46E5" },  // Indigo
    { name: "Exam Attended", value: 95, color: "#22C55E" },         // Green
    { name: "Passed", value: 75, color: "#EAB308" },                // Yellow
    { name: "Failed", value: 20, color: "#EF4444" },                // Red
];

const ExamStats = () => {
    const [filter, setFilter] = useState("thisMonth");

    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <Box sx={{ p: 1, backgroundColor: "#1E293B", minHeight: "100vh", borderRadius: "10px", width: "100%" }}>
            <Typography variant="h5" sx={{ mb: 3, color: "#E2E8F0", fontWeight: "bold" }}>
                Exam Statistics 📊
            </Typography>

            {/* Date Range Filter */}
            <Select
                value={filter}
                onChange={handleFilterChange}
                sx={{
                    mb: 3,
                    minWidth: 220,
                    backgroundColor: "#334155",
                    color: "#E2E8F0",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#475569" },
                    "& .MuiSelect-icon": { color: "#E2E8F0" }
                }}
            >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="lastWeek">Last Week</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="custom">Custom Date Range</MenuItem>
            </Select>

            {/* Pie Chart */}
            <Card sx={{ p: 2, borderRadius: "10px", backgroundColor: "#334155", mb: 3 }}>
                <CardContent>
                    <ResponsiveContainer width="100%" height={290}>
                        <PieChart>
                            <Pie
                                data={examData}
                                cx="50%"
                                cy="45%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name }) => name}
                            >
                                {examData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#1E293B", color: "#E2E8F0" }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Tabular Data */}
            <TableContainer component={Paper} sx={{ backgroundColor: "#334155", borderRadius: "10px" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#475569" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Category</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", fontWeight: "bold" }}>Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {examData.map((item, index) => (
                            <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#475569" } }}>
                                <TableCell sx={{ color: "#E2E8F0" }}>{item.name}</TableCell>
                                <TableCell sx={{ color: "#E2E8F0" }}>{item.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ExamStats;
