import { useState } from "react";
import { Switch, FormControlLabel, Box } from "@mui/material";

const ToggleSwitch = () => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isActive}
          onChange={handleToggle}
          color="success"
          size="small" 
        />
      }
      label={
        <Box
          sx={{
            minWidth: "60px", 
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color: isActive ? "green" : "gray",
            marginLeft:-1
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </Box>
      }
      sx={{
        bgcolor: isActive ? "rgba(0, 200, 83, 0.1)" : "rgba(0, 0, 0, 0.05)",
        px: 0.5,
        py: 0.5,
        borderRadius: 5,
      }}
    />
  );
};

export default ToggleSwitch;
