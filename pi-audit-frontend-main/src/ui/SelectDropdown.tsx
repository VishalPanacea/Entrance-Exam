import React, { ReactNode } from "react";
import { Select, MenuItem, SelectProps, styled } from "@mui/material";

// Custom styled Select component
const CustomSelect = styled(Select)({
  backgroundColor:'white',
  borderRadius: '25px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#EBEBEB',
    borderRadius: '25px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#EBEBEB',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#DB1F42',
    borderWidth: '1px',
  },
  '& .MuiSelect-select': {
    padding: '8px 16px',
    paddingRight: '32px !important',
    fontSize: '14px',
    fontWeight: 500,
    display: 'flex !important',
    alignItems: 'center',
    gap: '4px',
  },
  '& .MuiSelect-icon': {
    right: '12px',
    color: '#666',
  },
});

// Custom styled MenuItem component
const CustomMenuItem = styled(MenuItem)({
  fontSize: '14px',
  padding: '10px 16px',
  '&:not(:last-child)': {
    borderBottom: '1px solid #EBEBEB',
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '&.Mui-selected': {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
});

interface SelectDropdownProps extends Omit<SelectProps, 'onChange'> {
  value: string;
  onChange: (event: any) => void;
  options: string[];
  title: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  className,
  value,
  onChange,
  options,
  title,
  ...props
}) => {
  const renderValue = (selected: unknown): ReactNode => {
    return (
      <>
        {title}
        {selected && (
          <>
            <span style={{ margin: '0 4px' }}>:</span>
            <span style={{ fontWeight: 'normal' }}>{selected as string}</span>
          </>
        )}
      </>
    );
  };

  return (
    <CustomSelect
     className={className}
      value={value}
      onChange={onChange}
      displayEmpty
      renderValue={renderValue}
      {...props}
    >
      {options.map((option) => (
        <CustomMenuItem key={option} value={option}>
          {option}
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
};

export default SelectDropdown;