import React from "react";
import { connect } from "react-redux";
import {
  dailyBudgetSelector,
  isDarkSelector,
  usageDataSelector,
} from "../redux";

const mapStateToProps = (state) => {
  return {
    usageData: usageDataSelector(state),
    isDark: isDarkSelector(state),
    dailyBudget: dailyBudgetSelector(state),
  };
};

// const mapDispatchToProps = { setUsageData: TYPES.setUsageData };

const Dashboard = ({ openInput, usageData, isDark, dailyBudget }) => {
  const electricity = roundTo2(
    usageData
      ?.map((d) => Number(d.usage?.electricity?.cost) ?? 0)
      .reduce((a, c) => a + c, 0)
  );
  const gas = roundTo2(
    usageData
      ?.map((d) => Number(d.usage?.gas?.cost) ?? 0)
      .reduce((a, c) => a + c, 0)
  );
  const days = usageData.length ?? 1;
  const elecBudget = calcBudget(electricity, days, dailyBudget.elec);
  const gasBudget = calcBudget(gas, days, dailyBudget.gas);
  const combinedBudget = calcBudget(
    gas + electricity,
    days,
    dailyBudget.elec + dailyBudget.gas
  );

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

function roundTo2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// TODO: Add 25% to excess budget

function calcBudget(num, days, budge) {
  return roundTo2((num / (days * budge)) * 100);
}

function calcWidth(budge) {
  return roundTo2((budge / 125) * 100);
}

export default connect(mapStateToProps, null)(Dashboard);
