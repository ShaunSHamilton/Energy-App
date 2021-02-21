import React from "react";
import { connect } from "react-redux";
import {
  isDarkSelector,
  dateCounterSelector,
  selectedDateSelector,
  usageDataSelector,
} from "../redux";
import {
  ActionGenericType,
  ActionTypes,
  ReducerPayloadType,
  StateType,
  UsageDataType,
} from "../types";

const mapStateToProps = (state: StateType) => {
  return {
    isDark: isDarkSelector(state),
    dateCounter: dateCounterSelector(state),
    selectedDate: selectedDateSelector(state),
    usageData: usageDataSelector(state),
  };
};

const mapDispatchToProps = {
  setIsDark: (payload: boolean): ReducerPayloadType => ({
    type: ActionTypes.setIsDark,
    payload,
  }),
  setDateCounter: (payload: number): ReducerPayloadType => ({
    type: ActionTypes.setDateCounter,
    payload,
  }),
};

interface Props {
  isDark: boolean;
  setIsDark: ActionGenericType<boolean>;
  open: () => void;
  setDateCounter: ActionGenericType<number>;
  selectedDate: string | null;
  dateCounter: number;
  usageData: UsageDataType[];
}

const Taskbar = ({
  isDark,
  setIsDark,
  open,
  setDateCounter,
  selectedDate,
  dateCounter,
  usageData,
}: Props) => {
  const handleDateChange = (v: number) => {
    setDateCounter(
      dateCounter === 0 && v < 0
        ? 0
        : dateCounter === usageData.length - 1 && v > 0
        ? dateCounter
        : dateCounter + v
    );
  };
  return (
    <div className="bar top black large" style={{ zIndex: 4 }}>
      <button
        className="bar-item button hide-large hover-none hover-text-white"
        onClick={() => open()}
      >
        <i className="fas fa-bars"></i>
      </button>
      {selectedDate && (
        <div id="date-selector" className="bar-item padding-0">
          <button className="button" onClick={() => handleDateChange(-1)}>
            <span>
              <i className="fas fa-arrow-left"></i>
            </span>
          </button>
          {selectedDate}
          <button className="button" onClick={() => handleDateChange(1)}>
            <span>
              <i className="fas fa-arrow-right"></i>
            </span>
          </button>
        </div>
      )}
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
