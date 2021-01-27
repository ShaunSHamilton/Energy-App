import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isDarkSelector, TYPES } from "../redux";

import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Input from "./Input";
import Taskbar from "./Taskbar";

const MODE = "dev";
const URL =
  MODE === "dev"
    ? "http://localhost:8000/getData"
    : MODE === "test"
    ? "https://raw.githubusercontent.com/ShaunSHamilton/Energy-API/master/example-response.json"
    : "https://energy-app-api.herokuapp.com/getData";

const NAVITEMS = [
  { classes: "fa fa-history ", name: "Overview" },

  { classes: "fas fa-calendar-day ", name: "Today" },

  { classes: "fas fa-calendar-week ", name: "This Week" },

  { classes: "fas fa-calendar-alt ", name: "This Month" },

  { classes: "far fa-calendar-alt ", name: "This Year" },

  { classes: "fa fa-pound-sign ", name: "Tarrifs" },

  { classes: "fa fa-history ", name: "Usage" },
];

const mapStateToProps = (state) => {
  return {
    isDark: isDarkSelector(state),
  };
};

const mapDispatchToProps = {
  setUsageData: (payload) => ({ type: TYPES.setUsageData, payload }),
};

const App = ({ setUsageData, isDark }) => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  function open() {
    // Get the Sidebar
    const mySidebar = document.getElementById("mySidebar");

    // Get the DIV with overlay effect
    const overlayBg = document.getElementById("myOverlay");
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
    const mySidebar = document.getElementById("mySidebar");

    // Get the DIV with overlay effect
    const overlayBg = document.getElementById("myOverlay");
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }

  useEffect(async () => {
    try {
      const res = await fetch(URL); //fetch("");
      const data = await res.json();
      setUsageData(data?.usageData);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const openInput = () => {
    setIsOpenInput(!isOpenInput);
  };

  return (
    <div className={`light-grey ${isDark ? "dark-app" : ""}`}>
      <Taskbar open={open} />
      <Navbar close={close} navitems={NAVITEMS} />
      <Dashboard openInput={openInput} />
      {isOpenInput && <Input setIsOpenInput={setIsOpenInput} />}
      <div
        className="overlay hide-large animate-opacity"
        onClick={() => close()}
        style={{ cursor: "pointer" }}
        title="close side menu"
        id="myOverlay"
      ></div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
