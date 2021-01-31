import React from "react";
import { connect } from "react-redux";
import {
  dailyBudgetSelector,
  isDarkSelector,
  usageDataSelector,
} from "../redux";

import {
  roundTo2,
  calcBudget,
  calcWidth,
} from "../scripts/usageDataController";
import { DailyBudgetType, StateType, UsageDataType } from "../types";

const mapStateToProps = (state: StateType) => {
  return {
    usageData: usageDataSelector(state),
    isDark: isDarkSelector(state),
    dailyBudget: dailyBudgetSelector(state),
  };
};

// const mapDispatchToProps = { setUsageData: TYPES.setUsageData };

interface Props {
  openInput?: () => void;
  usageData?: UsageDataType[];
  isDark?: boolean;
  dailyBudget?: DailyBudgetType;
}

const Dashboard = ({ openInput, usageData, isDark, dailyBudget }: Props) => {
  const electricity = roundTo2(
    usageData
      ?.map((d: UsageDataType) => Number(d.usage?.electricity?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  const gas = roundTo2(
    usageData
      ?.map((d: UsageDataType) => Number(d.usage?.gas?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  const dBE = dailyBudget?.elec ?? 1;
  const dBG = dailyBudget?.gas ?? 1;
  const days = usageData?.length ?? 1;
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
              <h3 id="electricity-consumption">{electricity ?? "~"}</h3>
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
              <h3 id="gas-consumption">{gas ?? "~"}</h3>
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
              elecBudget > 100 ? "over-budget" : "red"
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
              gasBudget > 100 ? "over-budget" : "blue"
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
              combinedBudget > 100 ? "over-budget" : "green"
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
