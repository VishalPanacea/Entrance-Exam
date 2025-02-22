import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Dashboard from "../Dashboard";
// import Projects from "../Projects";
import PLQSA from "../../ProjectListForQSA/PLQSA";

const componentMap: { [key: string]: { component: React.FC; displayName: string } } = {
  dashboard: { component: Dashboard, displayName: "Dashboard" },
  projects: { component: PLQSA, displayName: "Projects" },
};

export const useLPMainAreaContainer = () => {
  const selectedMenuItem = useSelector((state: RootState) => state.lpMainArea.selectedItem);

  // Convert selected item to lowercase for consistency
  const selectedKey = selectedMenuItem.toLowerCase();

  // Get the correct component, defaulting to Dashboard
  const SelectedComponent = componentMap[selectedKey]?.component || Dashboard;
  const selectedDisplayName = componentMap[selectedKey]?.displayName || "Dashboard";

  return { SelectedComponent, selectedDisplayName };
};
