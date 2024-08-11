
import React from "react";
import { MatrixProvider } from "./context/MatrixContext";
import MatrixTable from "./components/MatrixTable";
import ControlPanel from "./components/ControlPanel";
import './index.css'

const App: React.FC = () => {
  return (
    <MatrixProvider>
      <ControlPanel />
      <MatrixTable />
    </MatrixProvider>
  );
};

export default App;
