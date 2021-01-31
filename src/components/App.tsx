import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isDarkSelector, TYPES } from "../redux";

import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Input from "./Input";
import Taskbar from "./Taskbar";
import { ActionGenericType, StateType, UsageDataType } from "../types";

console.log(process.env.REACT_APP_MODE);
const URL =
  process.env.REACT_APP_MODE === "development"
    ? "http://localhost:8000/getData"
    : process.env.REACT_APP_MODE === "test"
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

const mapStateToProps = (state: StateType) => {
  return {
    isDark: isDarkSelector(state),
  };
};

const mapDispatchToProps = {
  setUsageData: (payload: UsageDataType) => ({
    type: TYPES.setUsageData,
    payload,
  }),
};

interface Props {
  setUsageData: ActionGenericType<UsageDataType>;
  isDark: boolean;
}

const App = ({ setUsageData, isDark }: Props) => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  function open() {
    // Get the Sidebar
    const mySidebar = document.getElementById("mySidebar") as HTMLElement;

    // Get the DIV with overlay effect
    const overlayBg = document.getElementById("myOverlay") as HTMLElement;
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
    const mySidebar = document.getElementById("mySidebar") as HTMLElement;

    // Get the DIV with overlay effect
    const overlayBg = document.getElementById("myOverlay") as HTMLElement;
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }

  useEffect(() => {
    (async () => {
      try {
        const data: { usageData: UsageDataType } = await (
          await fetch(URL)
        ).json();
        setUsageData(data?.usageData);
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
