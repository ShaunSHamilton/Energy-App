import { createStore } from "redux";
import {
  InitialAccount,
  InitialMeterPoints,
  InitialProductDetails,
  InitialUsageData,
  StateType,
  ReducerPayloadType,
  InitialDailyBudget,
  ActionTypes,
} from "../types";
// ---------------------------------
// INITIAL APP STATE
// ---------------------------------

export const initialState: StateType = {
  location: "Overview",
  isDark: true,
  name: "Guest",
  dateCounter: 0,
  selectedDate: null,
  usageData: [InitialUsageData],
  dailyBudget: InitialDailyBudget,
  productDetails: InitialProductDetails,
  meterPoints: [InitialMeterPoints],
  account: InitialAccount,
};

// ---------------------------------
// SELECTORS
// ---------------------------------

export const locationSelector = (state: StateType) => state.location;
export const isDarkSelector = (state: StateType) => state.isDark;
export const nameSelector = (state: StateType) => state.name;
export const dateCounterSelector = (state: StateType) => state.dateCounter;
export const selectedDateSelector = (state: StateType) => state.selectedDate;
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
    case ActionTypes.setLocation:
      return { ...state, location: action.payload };
    case ActionTypes.setIsDark:
      return { ...state, isDark: action.payload };
    case ActionTypes.setName:
      return { ...state, name: action.payload };
    case ActionTypes.setDateCounter:
      return { ...state, dateCounter: action.payload };
    case ActionTypes.setSelectedDate:
      return { ...state, selectedDate: action.payload };
    case ActionTypes.setUsageData:
      return { ...state, usageData: action.payload };
    case ActionTypes.setDailyBudget:
      return { ...state, dailyBudget: action.payload };
    case ActionTypes.setProductDetails:
      return { ...state, productDetails: action.payload };
    case ActionTypes.setMeterPoints:
      return { ...state, meterPoints: action.payload };
    case ActionTypes.setAccount:
      return { ...state, account: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
