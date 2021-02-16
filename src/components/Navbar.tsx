import React from "react";
import { connect } from "react-redux";
import { nameSelector, locationSelector, isDarkSelector } from "../redux";
import {
  ActionGenericType,
  ActionTypes,
  StateType,
  ReducerPayloadType,
} from "../types";

const mapStateToProps = (state: StateType) => {
  return {
    location: locationSelector(state),
    name: nameSelector(state),
    isDark: isDarkSelector(state),
  };
};

const mapDispatchToProps = {
  setLocation: (payload: string): ReducerPayloadType => ({
    type: ActionTypes.setLocation,
    payload,
  }),
};

interface Props {
  navitems: { classes: string; name: string }[];
  close: () => void;
  name: string;
  setLocation: ActionGenericType<string>;
  location: string;
  isDark: boolean;
}

const Navbar = ({
  navitems,
  close,
  name,
  setLocation,
  location,
  isDark,
}: Props) => {
  const COMMON_CLASSES = "fa-fw padding-right";

  return (
    <nav
      className={`sidebar collapse animate-left ${
        isDark ? "dark-nav" : "white"
      }`}
      style={{ zIndex: 3, width: "300px" }}
      id="mySidebar"
    >
      <br />
      <div className="container row">
        <div className="col s1">
          <span className="circle margin-right">
            <i className="fas fa-user"></i>
          </span>
        </div>
        <div className="col s10 bar">
          <span>
            Welcome, <strong>{name}</strong>
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
          className="bar-item button padding-16 hide-large dark-grey hover-black"
          onClick={() => close()}
          title="close menu"
        >
          <i className="fas fa-remove"></i>  Close Menu
        </button>
        {navitems.map(({ name, classes }, i: number) => (
          <button
            key={i}
            onClick={() => {
              setLocation(name);
              close();
            }}
            className={`bar-item button ${
              location === name ? "highlight" : ""
            }`}
          >
            <i className={classes + COMMON_CLASSES}></i>
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
