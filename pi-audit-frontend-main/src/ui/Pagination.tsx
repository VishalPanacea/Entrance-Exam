import React from 'react';
import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PaginationContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0',
  gap: '16px',
  position:'relative',
  bottom: 0,
});

const PaginationControls = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const PaginationInfo = styled('div')({
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: 500,
});

const PageButton = styled('button')<{ active?: boolean }>(({ active }) => ({
  minWidth: '32px',
  height: '32px',
  padding: '0 6px',
  border: 'none',
  borderRadius: '100%',
  backgroundColor: active ? '#dc2626' : 'transparent',
  color: active ? '#ffffff' : '#374151',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: active ? '#dc2626' : '#f3f4f6',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

const NavigationButton = styled(IconButton)({
  padding: '4px',
  color: '#374151',
  '&:disabled': {
    opacity: 0.5,
  },
});

const Ellipsis = styled('span')({
  color: '#374151',
  padding: '0 4px',
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    }
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <PaginationContainer>
      <PaginationControls>
        <NavigationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </NavigationButton>

        {getPageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
          ) : (
            <PageButton
              key={pageNum}
              active={currentPage === pageNum}
              onClick={() => onPageChange(Number(pageNum))}
            >
              {pageNum}
            </PageButton>
          )
        ))}

        <NavigationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </NavigationButton>
      </PaginationControls>

      <PaginationInfo>
        Showing {startItem}-{endItem} of {totalItems} items
      </PaginationInfo>
    </PaginationContainer>
  );
};

export default Pagination;



// ------------------------Example Implementation for PAGINATION WITH TAB:E:
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
