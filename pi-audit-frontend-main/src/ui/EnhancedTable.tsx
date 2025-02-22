import React, { ReactNode } from 'react';
import { styled } from '@mui/material';
import { IconButton, Tooltip, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const TableContainer = styled('div')({
  width: '100%',
  overflow: 'hidden',
});

export const StyledTable = styled('table')({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0px 2px',
  borderRadius:'6px',
});

export const StyledTableHead = styled('thead')({
  backgroundColor: '#f9fafb',
  borderRadius: '6px',
  display: 'table-header-group', // Ensures proper table rendering
  '& tr': {
    position: 'relative',
  },
  '& tr::after': {
    content: '""',
    display: 'block',
    height: '12px', // Adds space **below the header row only**
  },
});

export const StyledTableHeaderCell = styled('th')({
  padding: '6px 16px',
  textAlign: 'left',
  color: '#6b7280',
  fontWeight: 500,
  backgroundColor:'#f1f1f1',
  fontSize: '1rem',
  border:'1px solid #EAEAEA',
  '&:first-of-type': {
    paddingLeft: '24px',
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
  },
  '&:last-of-type': {
    paddingRight: '24px',
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  },
  
});

export const StyledTableBody = styled('tbody')({
  '& tr:hover': {
    backgroundColor: '#f9fafb',
  },
});

export const StyledTableCell = styled('td')({
  padding: '6px 16px',
  fontSize: '14px',
  border: '1px solid #e5e7eb',
  backgroundColor: '#fff',
  color: '#374151',
  '&:first-of-type': {
    paddingLeft: '24px',
  },
  '&:last-of-type': {
    paddingRight: '24px',
  },
});

export const StyledTableRow = styled('tr')({
  transition: 'background-color 0.2s ease',
  '& td:first-child': {
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
  },
  '& td:last-child': {
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  },
});

export const IconsCell = styled('div')({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const StatusCell = styled('div')<{ status: 'active' | 'inactive' | 'draft' }>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 500,
  backgroundColor: 
    props.status === 'active' ? '#ecfdf5' :
    props.status === 'draft' ? '#eff6ff' : '#f3f4f6',
  color: 
    props.status === 'active' ? '#059669' :
    props.status === 'draft' ? '#3b82f6' : '#6b7280',
}));

interface TableIcon {
  icon: ReactNode;
  onClick?: () => void;
  tooltip?: string;
}

interface TableColumn {
  key: string;
  header: ReactNode;
  render?: (value: any, row: any) => ReactNode;
  icons?: TableIcon[];
}

interface EnhancedTableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  showCheckbox?: boolean;
  selectedRows?: string[];
  onRowSelect?: (selectedIds: string[]) => void;
  idField?: string;
}

export const EnhancedTable: React.FC<EnhancedTableProps> = ({
  columns,
  data,
  onRowClick,
  showCheckbox = false,
  selectedRows = [],
  onRowSelect,
  idField = 'id'
}) => {
  const handleCheckboxChange = (rowId: string) => {
    if (!onRowSelect) return;
    
    const newSelected = selectedRows.includes(rowId)
      ? selectedRows.filter(id => id !== rowId)
      : [...selectedRows, rowId];
    
    onRowSelect(newSelected);
  };

  const handleHeaderCheckboxChange = () => {
    if (!onRowSelect) return;
    
    const allIds = data.map(row => row[idField]);
    const newSelected = selectedRows.length === data.length ? [] : allIds;
    
    onRowSelect(newSelected);
  };

  return (
    <TableContainer>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            {showCheckbox && (
              <StyledTableHeaderCell style={{ width: '48px' }}>
                <Checkbox
                  checked={data.length > 0 && selectedRows.length === data.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                  onChange={handleHeaderCheckboxChange}
                  size="small"
                  icon={<RadioButtonUncheckedIcon />}
  checkedIcon={<CheckCircleIcon />}
  indeterminateIcon={<RemoveCircleOutlineIcon />}
                />
              </StyledTableHeaderCell>
            )}
            {columns.map((column, index) => (
              <StyledTableHeaderCell key={index}>
                {column.header}
              </StyledTableHeaderCell>
            ))}
          </StyledTableRow>
          <div style={{marginBottom:'4px'}}></div>
        </StyledTableHead>
        <StyledTableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {showCheckbox && (
                <StyledTableCell style={{ width: '48px' }}>
                  <Checkbox
                    checked={selectedRows.includes(row[idField])}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(row[idField]);
                    }}
                    size="small"
                     icon={<RadioButtonUncheckedIcon />}
  checkedIcon={<CheckCircleIcon />}
  indeterminateIcon={<RemoveCircleOutlineIcon />}
                  />
                </StyledTableCell>
              )}
              {columns.map((column, cellIndex) => (
                <StyledTableCell key={cellIndex}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      row[column.key]
                    )}
                    
                    {column.icons && (
                      <IconsCell>
                        {column.icons.map((iconConfig, iconIndex) => (
                          <Tooltip
                            key={iconIndex}
                            title={iconConfig.tooltip || ''}
                            placement="top"
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                iconConfig.onClick?.();
                              }}
                            >
                              {iconConfig.icon}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </IconsCell>
                    )}
                  </div>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default EnhancedTable;





//--------------------------- THIS IS THE EXAMPLE USAGE WITH PAGINATION:------------------------------
// import React, { useState, useEffect } from "react";
// import Pagination from "../ui/Pagination";
// import EnhancedTable from "../ui/EnhancedTable";
// import { Edit, PlayArrow, Download, Delete } from "@mui/icons-material";
// import styles from "./LPHeader.module.css";

// interface TableData {
//   id: number;
//   name: string;
//   email: string;
//   status: string;
// }

// const Dashboard = () => {
//   const pageSize = 10;
//   const [allData, setAllData] = useState<TableData[]>([]);
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const currentPageData = allData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const columns = [
//     { key: "name", header: "Name" },
//     { key: "email", header: "Email" },
//     {
//       key: "status",
//       header: "Status",
//       render: (value: string) => (
//         <span style={{ color: value === "active" ? "green" : "red" }}>
//           {value}
//         </span>
//       ),
//     },
//     {
//       key: "actions",
//       header: "Actions",
//       icons: [
//         {
//           icon: <Edit sx={{ fontSize: 20, color: "#6b7280" }} />,
//           onClick: () => console.log("Edit clicked"),
//           tooltip: "Edit",
//         },
//         {
//           icon: <PlayArrow sx={{ fontSize: 20, color: "#6b7280" }} />,
//           onClick: () => console.log("Play clicked"),
//           tooltip: "Run",
//         },
//         {
//           icon: <Download sx={{ fontSize: 20, color: "#6b7280" }} />,
//           onClick: () => console.log("Download clicked"),
//           tooltip: "Download",
//         },
//         {
//           icon: <Delete sx={{ fontSize: 20, color: "#6b7280" }} />,
//           onClick: () => console.log("Delete clicked"),
//           tooltip: "Delete",
//         },
//       ],
//     },
//   ];

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       // Simulating API call
//       const mockData = Array.from({ length: 12 }, (_, index) => ({
//         id: index + 1,
//         name: `User ${index + 1}`,
//         email: `user${index + 1}@example.com`,
//         status: index % 2 === 0 ? "active" : "inactive",
//       }));

//       setAllData(mockData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1>Dashboard</h1>

//       <div className={styles.tableContainer}>
//         <EnhancedTable
//           columns={columns}
//           data={currentPageData}
//           showCheckbox={true}
//           selectedRows={selectedRows}
//           onRowSelect={setSelectedRows}
//           idField="id"
//           isLoading={isLoading}
//         />
//       </div>

//       <div className={styles.paginationContainer}>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(allData.length / pageSize)}
//           onPageChange={setCurrentPage}
//           pageSize={pageSize}
//           totalItems={allData.length}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
