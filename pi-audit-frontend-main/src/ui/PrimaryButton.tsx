import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  backgroundColor: "#DB1F42",
  color: "white",
  borderRadius:'25px',
  fontSize:'12px',
  fontWeight:'500',
  padding:'0.5%',
  "&:hover": {
    backgroundColor: "white",
    color: "#DB1F42",
    border: "1px solid #DB1F42", // Darker shade on hover
  },
  "&:active": {
    backgroundColor: "white",
    color: "#DB1F42",
    border: "1px solid #DB1F42",
  },
});

const PrimaryButton = ({
  children,
  onClick,
  startIcon,
  endIcon,
  className, // Added className prop
}: {
  children: React.ReactNode;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string; // Allow external styles
}) => (
  <StyledButton
    variant="contained"
    onClick={onClick}
    startIcon={startIcon}
    endIcon={endIcon}
    className={className}
  >
    {children}
  </StyledButton>
);

export default PrimaryButton;
