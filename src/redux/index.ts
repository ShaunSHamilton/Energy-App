import { createStore } from "redux";
import {
  InitialAccount,
  InitialMeterPoints,
  InitialProductDetails,
  InitialUsageData,
  StateType,
  ReducerPayloadType,
  UsageDataType,
  InitialDailyBudget,
  DailyBudgetType,
  ProductDetailsType,
  MeterPointsType,
  AccountType,
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
  { type, payload }: { type: string; payload: ReducerPayloadType }
): StateType {
  switch (type) {
    case TYPES.setLocation:
      return { ...state, location: payload as string };
    case TYPES.setIsDark:
      return { ...state, isDark: payload as boolean };
    case TYPES.setName:
      return { ...state, name: payload as string };
    case TYPES.setUsageData:
      return { ...state, usageData: payload as UsageDataType[] };
    case TYPES.setDailyBudget:
      return { ...state, dailyBudget: payload as DailyBudgetType };
    case TYPES.setProductDetails:
      return { ...state, productDetails: payload as ProductDetailsType };
    case TYPES.setMeterPoints:
      return { ...state, meterPoints: payload as MeterPointsType[] };
    case TYPES.setAccount:
      return { ...state, account: payload as AccountType };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
