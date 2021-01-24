import { createStore } from "redux";

// ---------------------------------
// INITIAL APP STATE
// ---------------------------------

export const initialState = {
  location: "Overview",
  isDark: true,
  name: "Guest",
  usageData: [],
  dailyBudget: { elec: 1.0, gas: 1.0 },
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
};

// ---------------------------------
// SELECTORS
// ---------------------------------

export const locationSelector = (state) => state.location;
export const isDarkSelector = (state) => state.isDark;
export const nameSelector = (state) => state.name;
export const usageDataSelector = (state) => state.usageData;
export const dailyBudgetSelector = (state) => state.dailyBudget;

// ---------------------------------
// REDUCER
// ---------------------------------

function reducer(state = initialState, { type, payload }) {
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
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
