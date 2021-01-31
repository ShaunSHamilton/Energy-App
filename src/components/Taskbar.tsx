import React from "react";
import { connect } from "react-redux";
import { isDarkSelector, TYPES } from "../redux";
import { ActionGenericType, StateType } from "../types";

const mapStateToProps = (state: StateType) => {
  return {
    isDark: isDarkSelector(state),
  };
};

const mapDispatchToProps = {
  setIsDark: (payload: boolean) => ({ type: TYPES.setIsDark, payload }),
};

interface Props {
  isDark: boolean;
  setIsDark: ActionGenericType<boolean>;
  open: () => void;
}

const Taskbar = ({ isDark, setIsDark, open }: Props) => {
  return (
    <div className="bar top black large" style={{ zIndex: 4 }}>
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
