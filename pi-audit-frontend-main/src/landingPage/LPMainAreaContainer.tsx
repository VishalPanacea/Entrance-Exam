import React from "react";
import { Outlet } from "react-router-dom";

const LPMainAreaContainer: React.FC = () => {
  return (
    <div>
      <Outlet /> 
    </div>
  );
};

export default LPMainAreaContainer;
