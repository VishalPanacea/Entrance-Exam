import React from "react";
import { useLPSideMenuBar } from "./hooks/useLPSideMenuBar";
import styles from "./styles/LPSideMenuBar.module.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import PeopleIcon from "@mui/icons-material/People";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";

const iconMap: { [key: string]: React.ElementType } = {
  Dashboard: DashboardIcon,
  Projects: FolderIcon,
  Clients: PeopleIcon,
};

const LPSideMenuBar: React.FC = () => {
  const {
    isCollapsed,
    menuItems,
    handleToggleSidebar,
    selectedMenuItem,
  } = useLPSideMenuBar();
  console.log('These are the imported menuItems', menuItems);
  
  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.menuList}>
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = selectedMenuItem === item.label;
          return (
            <NavLink
              key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.menuItem} ${isActive ? styles.activeMenuItem : ""}`
                }
              >
              <div className={styles.icon}>
                <Icon />
              </div>
              {!isCollapsed && (
                <span className={styles.label}>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>
      <div className={styles.toolbar} onClick={handleToggleSidebar}>
        <div className={styles.toggleButton}>
          <ChevronLeftIcon />
        </div>
        {!isCollapsed && <span>Collapse</span>}
      </div>
    </div>
  );
};

export default LPSideMenuBar;
