// ----------------------------------------------
// DATA TYPES
// ----------------------------------------------
export type UnitRatesType = {
  Standard: number;
  Day: number;
  Night: number;
  Peak: number;
  __typename: string;
};

export type ProductFragmentType = {
  medium: string;
  tariff: string;
  supplier: string;
  tariffType: string;
  paymentMethod: string;
  standingCharge: number;
  onlineDiscount: number;
  from: string;
  dualFuelDiscount: number;
  annualConsumption: string;
  annualCost: number;
  tcr: string;
  exitFees: number;
  unitRates: UnitRatesType;
  tariffEndsOn: string;
  priceGuaranteedUntil: string;
  isEconomy7: boolean;
  isSmartPayg: boolean;
  meterGenerationType: string;
  __typename: String;
};

export type ProductDetailsType = {
  gas: ProductFragmentType;
  electricity: ProductFragmentType;
  __typename: string;
};

export type UsageDataType = {
  date: string;
  usage: {
    gas: { cost: string; __typename: string };
    electricity: {
      cost: number;
      rates: [{ cost: number; name: string; __typename: string }];
      __typename: string;
    };
    __typename: string;
  };
  __typename: string;
};

export type MeterPointsType = {
  from: string;
  technicalDetailsDate: string;
  type: string;
  smart: boolean;
  canAcceptReadings: boolean;
  __typename: string;
  readings: [
    {
      cumulative: number;
      register: string;
      quality: string;
      readingDate: string;
      source: string;
      unit: string;
      __typename: string;
    }
  ];
};

export type AccountType = {
  currency: string;
  balance: number;
  pendingBalance: number;
  inRangeOfSmartInstaller: boolean;
  __typename: string;
};

export type EnergyDataType = {
  productDetails: ProductDetailsType;
  usageData: UsageDataType[];
  meterPoints: MeterPointsType[];
  account: AccountType;
  dateModified: string;
};

// --------------------------------------------
// REDUX
// --------------------------------------------

export type DailyBudgetType = { elec: number; gas: number };
export type StateType = {
  location: string;
  isDark: boolean;
  name: string;
  usageData: UsageDataType[];
  dailyBudget: DailyBudgetType;
  account: AccountType;
  meterPoints: MeterPointsType[];
  productDetails: ProductDetailsType;
};

export const enum ActionTypes {
  setLocation = "setLocation",
  setIsDark = "setIsDark",
  setName = "setName",
  setUsageData = "setUsageData",
  setDailyBudget = "setDailyBudget",
  setProductDetails = "setProductDetails",
  setMeterPoints = "setMeterPoints",
  setAccount = "setAccount",
}

export type ReducerPayloadType =
  | { type: ActionTypes.setLocation; payload: StateType["location"] }
  | { type: ActionTypes.setIsDark; payload: StateType["isDark"] }
  | { type: ActionTypes.setName; payload: StateType["name"] }
  | { type: ActionTypes.setUsageData; payload: StateType["usageData"] }
  | { type: ActionTypes.setDailyBudget; payload: StateType["dailyBudget"] }
  | {
      type: ActionTypes.setProductDetails;
      payload: StateType["productDetails"];
    }
  | { type: ActionTypes.setMeterPoints; payload: StateType["meterPoints"] }
  | { type: ActionTypes.setAccount; payload: StateType["account"] };

export const InitialUnitRates: UnitRatesType = {
  Standard: 0,
  Day: 0,
  Night: 0,
  Peak: 0,
  __typename: "",
};

export const InitialProductFragment: ProductFragmentType = {
  medium: "",
  tariff: "",
  supplier: "",
  tariffType: "",
  paymentMethod: "",
  standingCharge: 0,
  onlineDiscount: 0,
  from: "",
  dualFuelDiscount: 0,
  annualConsumption: "",
  annualCost: 0,
  tcr: "",
  exitFees: 0,
  unitRates: InitialUnitRates,
  tariffEndsOn: "",
  priceGuaranteedUntil: "",
  isEconomy7: true,
  isSmartPayg: true,
  meterGenerationType: "",
  __typename: "",
};

export const InitialProductDetails: ProductDetailsType = {
  gas: InitialProductFragment,
  electricity: InitialProductFragment,
  __typename: "",
};

export const InitialUsageData: UsageDataType = {
  date: "",
  usage: {
    gas: { cost: "", __typename: "" },
    electricity: {
      cost: 0,
      rates: [{ cost: 0, name: "", __typename: "" }],
      __typename: "",
    },
    __typename: "",
  },
  __typename: "",
};

export const InitialMeterPoints: MeterPointsType = {
  from: "",
  technicalDetailsDate: "",
  type: "",
  smart: true,
  canAcceptReadings: true,
  __typename: "",
  readings: [
    {
      cumulative: 0,
      register: "",
      quality: "",
      readingDate: "",
      source: "",
      unit: "",
      __typename: "",
    },
  ],
};

export const InitialAccount: AccountType = {
  currency: "",
  balance: 0,
  pendingBalance: 0,
  inRangeOfSmartInstaller: true,
  __typename: "",
};

export const InitialEnergyData: EnergyDataType = {
  productDetails: InitialProductDetails,
  usageData: [InitialUsageData],
  meterPoints: [InitialMeterPoints],
  account: InitialAccount,
  dateModified: "2021-01-01T00:00:00.000Z",
};

export const InitialDailyBudget: DailyBudgetType = {
  elec: 1.0,
  gas: 1.0,
};

// -----------------------------------------------------
// SERVER DATA TYPES
// -----------------------------------------------------

export type UpdateResponseType = {
  name: string;
  verified: boolean;
  obj: EnergyDataType;
  text: string;
  error: string | undefined;
};

// -----------------------------------------------------
// DISPATCH ACTION TYPES
// -----------------------------------------------------

export type ActionGenericType<T> = (payload: T) => ReducerPayloadType; //{ payload: T; type: string };
