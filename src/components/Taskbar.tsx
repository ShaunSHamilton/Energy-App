import React from "react";
import { connect } from "react-redux";
import { isDarkSelector, TYPES } from "../redux";

const mapStateToProps = (state) => {
  return {
    isDark: isDarkSelector(state),
  };
};

const mapDispatchToProps = {
  setIsDark: (payload) => ({ type: TYPES.setIsDark, payload }),
};

const Taskbar = ({ isDark, setIsDark, open }) => {
  return (
    <div className="bar top black large" style={{ zIndex: "4" }}>
      <button
        className="bar-item button hide-large hover-none hover-text-white"
        onClick={() => open()}
      >
        <i className="fas fa-bars"></i>
      </button>
      <button
        onClick={() => setIsDark(!isDark)}
        className={`right button bar-item ${isDark ? "" : "lightbulb"}`}
      >
        <span>
          <i
            className={`fa fa-lightbulb ${isDark ? "light-off" : "light-on"}`}
          ></i>
        </span>
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);
