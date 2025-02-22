import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/lpSideMenuSlice";
import { setSelectedItem } from "../../redux/lpMainAreaSlice";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { setAuthDetails } from "../../redux/loginSlice";

export const useLPSideMenuBar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: RootState) => state.lpSideMenu.isCollapsed
  );

  const menuItems = useSelector(
    (state: RootState) => state.login.userMenu || []
  );

  const handleMenuItemClick = (label: string) => {
    dispatch(setSelectedItem(label));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  const selectedMenuItem = useSelector(
    (state: RootState) => state.lpMainArea.selectedItem
  );

  useEffect(() => {
    const storedMenu = localStorage.getItem("menuItems");
    if (storedMenu) {
      dispatch(setAuthDetails(JSON.parse(storedMenu)));
    }
  }, [dispatch]);

  return {
    isCollapsed,
    menuItems,
    handleToggleSidebar,
    handleMenuItemClick,
    selectedMenuItem,
  };
};
