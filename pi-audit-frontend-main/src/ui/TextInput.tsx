import React from "react";
import { styled } from "@mui/material/styles";

const StyledInput = styled("input")({
  width: "100%",
  padding: "8px 0",
  border: "none",
  borderBottom: "2px solid #BCBCBC", // Default bottom border
  outline: "none",
  fontSize: "16px",
  color: "#333",
  backgroundColor: "transparent",
  transition: "border-color 0.3s",

  "&:focus": {
    borderBottom: "2px solid #8C8C8C", // Darker border on focus
  },

  "&::placeholder": {
    color: "#BCBCBC",
    fontSize: "14px",
  },
});

const TextInput = ({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => (
  <StyledInput
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
  />
);

export default TextInput;
