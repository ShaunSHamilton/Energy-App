import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Taskbar from "./Taskbar";

const App = () => {
  return (
    <body id="main" class="light-grey">
      <Taskbar />
      <Navbar />
      <Dashboard />
    </body>
  );
};

export default App;
