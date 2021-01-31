import React from "react";
import { connect } from "react-redux";
import {
  dailyBudgetSelector,
  isDarkSelector,
  locationSelector,
  usageDataSelector,
} from "../redux";

import {
  roundTo2,
  calcBudget,
  calcWidth,
  overviewCalc,
  weekCalc,
  todayCalc,
  monthCalc,
  yearCalc,
} from "../scripts/usageDataController";
import { DailyBudgetType, StateType, UsageDataType } from "../types";

const mapStateToProps = (state: StateType) => {
  return {
    usageData: usageDataSelector(state),
    isDark: isDarkSelector(state),
    dailyBudget: dailyBudgetSelector(state),
    location: locationSelector(state),
  };
};

// const mapDispatchToProps = { setUsageData: TYPES.setUsageData };

interface Props {
  openInput?: () => void;
  usageData?: UsageDataType[];
  isDark?: boolean;
  dailyBudget?: DailyBudgetType;
  location?: string;
}

const Dashboard = ({
  openInput,
  usageData,
  isDark,
  dailyBudget,
  location,
}: Props) => {
  let data;
  let days = 1;
  switch (location) {
    case "Overview":
      data = overviewCalc(usageData);
      days = usageData?.length ?? 1;
      break;
    case "Today":
      data = todayCalc(usageData);
      break;
    case "This Week":
      data = weekCalc(usageData);
      days = 7;
      break;
    case "This Month":
      data = monthCalc(usageData);
      days = 30;
      break;
    case "This Year":
      data = yearCalc(usageData);
      days = 365;
      break;
    default:
      data = { electricity: 0, gas: 0 };
      break;
  }
  const { electricity = 0, gas = 0 } = data;
  const dBE = dailyBudget?.elec ?? 1;
  const dBG = dailyBudget?.gas ?? 1;
  const elecBudget = calcBudget(electricity, days, dBE);
  const gasBudget = calcBudget(gas, days, dBG);
  const combinedBudget = calcBudget(gas + electricity, days, dBE + dBG);

  return (
    <div className="main" style={{ marginLeft: "300px", marginTop: "43px" }}>
      <header className="container" style={{ paddingTop: "22px" }}>
        <h5>
          <b>
            <i className="fa fa-dashboard"></i>
            <button
              id="updateBtn"
              className={`${isDark ? "dark-button" : ""}`}
              onClick={openInput}
            >
              {" "}
              Update Dashboard
            </button>
          </b>
        </h5>
      </header>

      <div className="row-padding margin-bottom">
        <div className="quarter">
          <div className="container red padding-16">
            <div className="left">
              <i className="fas fa-bolt xxxlarge"></i>
            </div>
            <div className="right">
              <h3 id="electricity-consumption">{electricity || "~"}</h3>
            </div>
            <div className="clear"></div>
            <h4>Electricity</h4>
          </div>
        </div>
        <div className="quarter">
          <div className="container blue padding-16">
            <div className="left">
              <i className="fas fa-fire xxxlarge"></i>
            </div>
            <div className="right">
              <h3 id="gas-consumption">{gas || "~"}</h3>
            </div>
            <div className="clear"></div>
            <h4>Gas</h4>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="row-padding" style={{ margin: "0-16px" }}>
          <div className="third">
            <h5>Graph</h5>
            <img style={{ width: "100%" }} alt="Placeholder" />
          </div>
          <div className="twothird">
            <h5>Consumption</h5>
            <table
              className={`table ${
                isDark ? "dark-striped dark-table" : "striped white"
              }`}
            >
              <tbody>
                <tr>
                  <td>
                    <i className="fa fa-bolt text-blue large"></i>
                  </td>
                  <td>Electricity</td>
                  <td>
                    <i className="fa fa-pound-sign"></i> {electricity}
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="fa fa-fire text-red large"></i>
                  </td>
                  <td>Gas</td>
                  <td>
                    <i className="fa fa-pound-sign"></i> {gas}
                  </td>
                </tr>
                <tr>
                  <td>
                    <i className="fa fa-lightbulb text-yellow large"></i>
                  </td>
                  <td>Combined</td>
                  <td>
                    <i className="fa fa-pound-sign"></i>{" "}
                    {roundTo2(gas + electricity)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <h5>Budget for Period: {days} Days</h5>
        <p>Electricity Cost</p>
        <div className={`${isDark ? "dark-bar" : "grey"}`}>
          <div
            className={`container center padding ${
              elecBudget > 100 ? "over-budget-elec" : "red"
            }`}
            style={{ width: `${calcWidth(elecBudget)}%` }}
          >
            {elecBudget}%
          </div>
        </div>

        <p>Gas Cost</p>
        <div className={`${isDark ? "dark-bar" : "grey"}`}>
          <div
            className={`container center padding ${
              gasBudget > 100 ? "over-budget-gas" : "blue"
            }`}
            style={{ width: `${calcWidth(gasBudget)}%` }}
          >
            {gasBudget}%
          </div>
        </div>

        <p>Combined Cost</p>
        <div className={`${isDark ? "dark-bar" : "grey"}`}>
          <div
            className={`container center padding ${
              combinedBudget > 100 ? "over-budget-comb" : "green"
            }`}
            style={{ width: `${calcWidth(combinedBudget)}%` }}
          >
            {combinedBudget}%
          </div>
        </div>
      </div>
      <hr />

      <div className="container"></div>
      <div className="container dark-grey padding-16"></div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Dashboard);
