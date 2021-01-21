import React from "react";

const Taskbar = () => {
  return (
    <div className="bar top black large" style={{ zIndex: "4" }}>
      <button
        className="bar-item button hide-large hover-none hover-text-white"
        onClick="open();"
      >
        <i className="fas fa-bars"></i>
      </button>
      <span className="bar-item right">
        <i className="fa fa-lightbulb"></i>
      </span>
    </div>
  );
};

export default Taskbar;
