import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
// import Settings from "./Settings";
import Taskbar from "./Taskbar";

const App = () => {
  function open() {
    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");

    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");
    if (mySidebar.style.display === "block") {
      mySidebar.style.display = "none";
      overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = "block";
      overlayBg.style.display = "block";
    }
  }

  // Close the sidebar with the close button
  function close() {
    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");

    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }
  return (
    <body id="main" className="light-grey">
      <Taskbar open={open} />
      <Navbar close={close} />
      <Dashboard />
      <div
        className="overlay hide-large animate-opacity"
        onClick={() => close()}
        style={{ cursor: "pointer" }}
        title="close side menu"
        id="myOverlay"
      ></div>
    </body>
  );
};

export default App;
