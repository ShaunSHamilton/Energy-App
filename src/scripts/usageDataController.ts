import { UsageDataType } from "../types";

export function roundTo2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function calcBudget(num: number, days: number, budge: number): number {
  return roundTo2((num / (days * budge)) * 100);
}

export function calcWidth(budge: number): number {
  return roundTo2((budge / 125) * 100);
}

export function overviewCalc(usageData: UsageDataType[] | undefined) {
  const electricity = roundTo2(
    usageData
      ?.map((d: UsageDataType) => Number(d.usage?.electricity?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  const gas = roundTo2(
    usageData
      ?.map((d: UsageDataType) => Number(d.usage?.gas?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  return {
    gas,
    electricity,
    date: null,
  };
}

export function dayCalc(
  usageData: UsageDataType[] | undefined,
  dayCounter: number
) {
  // const now = new Date();
  // const data = usageData?.find(
  //   (d: UsageDataType) => d.date === now.toISOString().slice(0, 10)
  // );
  const data = usageData?.[dayCounter];
  return {
    gas: roundTo2(Number(data?.usage?.gas?.cost)) || undefined,
    electricity: roundTo2(Number(data?.usage?.electricity?.cost)) || undefined,
    date: data?.date || null,
  };
}

export function weekCalc(usageData: UsageDataType[] | undefined) {
  const electricity = roundTo2(
    usageData
      ?.slice(-7)
      ?.map((d: UsageDataType) => Number(d.usage?.electricity?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  const gas = roundTo2(
    usageData
      ?.slice(-7)
      ?.map((d: UsageDataType) => Number(d.usage?.gas?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  return {
    gas,
    electricity,
    date: null,
  };
}

export function monthCalc(usageData: UsageDataType[] | undefined) {
  const electricity = roundTo2(
    usageData
      ?.slice(-30)
      ?.map((d: UsageDataType) => Number(d.usage?.electricity?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  const gas = roundTo2(
    usageData
      ?.slice(-30)
      ?.map((d: UsageDataType) => Number(d.usage?.gas?.cost) ?? 0)
      .reduce((a: number, c: number) => a + c, 0) || 0
  );
  return {
    gas,
    electricity,
    date: null,
  };
}

export function yearCalc(usageData: UsageDataType[] | undefined) {
  const now = new Date();
  const data = usageData?.find(
    (d: UsageDataType) => d.date === now.toISOString().slice(0, 10)
  );
  return {
    gas: Number(data?.usage?.gas?.cost),
    electricity: Number(data?.usage?.electricity?.cost),
    date: null,
  };
}
