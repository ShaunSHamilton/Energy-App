import React from "react";

const Navbar = (props) => {
  return (
    <nav
      className="sidebar collapse white animate-left"
      style={{ zIndex: "3", width: "300px" }}
      id="mySidebar"
    >
      <br />
      <div className="container row">
        <div className="col s4">
          <a href="#" className="circle margin-right">
            <i className="fas fa-user"></i>
          </a>
        </div>
        <div className="col s8 bar">
          <span>
            Welcome, <strong>Shaun</strong>
          </span>
          <br />
        </div>
      </div>
      <hr />
      <div className="container">
        <h5>Dashboard</h5>
      </div>
      <div className="bar-block">
        <button
          href="#"
          className="bar-item button padding-16 hide-large dark-grey hover-black"
          onClick={() => props.close()}
          title="close menu"
        >
          <i className="fas fa-remove"></i>  Close Menu
        </button>
        <a href="index.html" className="bar-item button padding">
          <i className="fa fa-history fa-fw"></i>  Overview
        </a>
        <a href="today.html" className="bar-item button padding">
          <i className="fas fa-calendar-day fa-fw"></i>  Today
        </a>
        <a href="week.html" className="bar-item button padding">
          <i className="fas fa-calendar-week fa-fw"></i>  This Week
        </a>
        <a href="month.html" className="bar-item button padding">
          <i className="fas fa-calendar-alt fa-fw"></i>  This Month
        </a>
        <a href="year.html" className="bar-item button padding">
          <i className="far fa-calendar-alt fa-fw"></i>  This Year
        </a>
        <a href="tarrifs.html" className="bar-item button padding">
          <i className="fa fa-pound-sign fa-fw"></i>  Tarrifs
        </a>
        <a href="usage.html" className="bar-item button padding">
          <i className="fa fa-history fa-fw"></i>  Usage
        </a>
        <a href="data.html" className="bar-item button padding">
          <i className="fa fa-database fa-fw"></i>  Data
        </a>
        <a href="settings.html" className="bar-item button">
          <i className="fa fa-cog fa-fw"></i> Settings
        </a>
        <br />
        <br />
      </div>
    </nav>
  );
};

export default Navbar;
