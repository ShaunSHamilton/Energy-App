import React from "react";

const Dashboard = () => {
  return (
    <div className="main" style={{ marginLeft: "300px", marginTop: "43px" }}>
      <header className="container" style={{ paddingTop: "22px" }}>
        <h5>
          <b>
            <i className="fa fa-dashboard"></i>
            <button id="testBt"> Update Dashboard</button>
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
              <h3 id="electricity-consumption">~</h3>
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
              <h3 id="gas-consumption">~</h3>
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
            <table className="table striped white">
              <tr>
                <td>
                  <i className="fa fa-bolt text-blue large"></i>
                </td>
                <td>Electricity</td>
                <td>
                  <i className="fa fa-pound-sign"></i> 10
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-fire text-red large"></i>
                </td>
                <td>Gas</td>
                <td>
                  <i className="fa fa-pound-sign"></i> 10
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-lightbulb text-yellow large"></i>
                </td>
                <td>Combined</td>
                <td>
                  <i className="fa fa-pound-sign"></i> 10
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <h5>Budget</h5>
        <p>Electricity Cost</p>
        <div className="grey">
          <div
            className="container center padding green"
            style={{ width: "25%" }}
          >
            +25%
          </div>
        </div>

        <p>Gas Cost</p>
        <div className="grey">
          <div
            className="container center padding orange"
            style={{ width: "50%" }}
          >
            50%
          </div>
        </div>

        <p>Combined Cost</p>
        <div className="grey">
          <div
            className="container center padding red"
            style={{ width: "75%" }}
          >
            75%
          </div>
        </div>
      </div>
      <hr />

      <div className="container"></div>
      <div className="container dark-grey padding-32"></div>
    </div>
  );
};

export default Dashboard;
