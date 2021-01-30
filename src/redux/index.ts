import { createStore } from "redux";
import {
  InitialAccount,
  InitialMeterPoints,
  InitialProductDetails,
  InitialUsageData,
  StateType,
  ReducerPayloadType,
} from "../types";
// ---------------------------------
// INITIAL APP STATE
// ---------------------------------

export const initialState: StateType = {
  location: "Overview",
  isDark: true,
  name: "Guest",
  usageData: [InitialUsageData],
  dailyBudget: { elec: 1.0, gas: 1.0 },
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
  { type, payload }: { type: string; payload: ReducerPayloadType }
): StateType {
  switch (type) {
    case TYPES.setLocation:
      return { ...state, location: payload };
    case TYPES.setIsDark:
      return { ...state, isDark: payload };
    case TYPES.setName:
      return { ...state, name: payload };
    case TYPES.setUsageData:
      return { ...state, usageData: payload };
    case TYPES.setDailyBudget:
      return { ...state, dailyBudget: payload };
    case TYPES.setProductDetails:
      return { ...state, productDetails: payload };
    case TYPES.setMeterPoints:
      return { ...state, meterPoints: payload };
    case TYPES.setAccount:
      return { ...state, account: payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
