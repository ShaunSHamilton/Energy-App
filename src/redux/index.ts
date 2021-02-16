import { createStore } from "redux";
import {
  InitialAccount,
  InitialMeterPoints,
  InitialProductDetails,
  InitialUsageData,
  StateType,
  ReducerPayloadType,
  InitialDailyBudget,
} from "../types";
// ---------------------------------
// INITIAL APP STATE
// ---------------------------------

export const initialState: StateType = {
  location: "Overview",
  isDark: true,
  name: "Guest",
  usageData: [InitialUsageData],
  dailyBudget: InitialDailyBudget,
  productDetails: InitialProductDetails,
  meterPoints: [InitialMeterPoints],
  account: InitialAccount,
};

// ---------------------------------
// ACTION TYPES
// ---------------------------------

export const TYPES = {
  setLocation: "setLocation",
  setIsDark: "setIsDark",
  setName: "setName",
  setUsageData: "setUsageData",
  setDailyBudget: "setDailyBudget",
  setProductDetails: "setProductDetails",
  setMeterPoints: "setMeterPoints",
  setAccount: "setAccount",
};

// ---------------------------------
// SELECTORS
// ---------------------------------

export const locationSelector = (state: StateType) => state.location;
export const isDarkSelector = (state: StateType) => state.isDark;
export const nameSelector = (state: StateType) => state.name;
export const usageDataSelector = (state: StateType) => state.usageData;
export const productDetailsSelector = (state: StateType) =>
  state.productDetails;
export const meterPointsSelector = (state: StateType) => state.meterPoints;
export const accountSelector = (state: StateType) => state.account;
export const dailyBudgetSelector = (state: StateType) => state.dailyBudget;

// ---------------------------------
// REDUCER
// ---------------------------------

function reducer(
  state: StateType = initialState,
  action: ReducerPayloadType
): StateType {
  switch (action.type) {
    case "setLocation":
      return { ...state, location: action.payload };
    case "setIsDark":
      return { ...state, isDark: action.payload };
    case "setName":
      return { ...state, name: action.payload };
    case "setUsageData":
      return { ...state, usageData: action.payload };
    case "setDailyBudget":
      return { ...state, dailyBudget: action.payload };
    case "setProductDetails":
      return { ...state, productDetails: action.payload };
    case "setMeterPoints":
      return { ...state, meterPoints: action.payload };
    case "setAccount":
      return { ...state, account: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
