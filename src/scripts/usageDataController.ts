export function roundTo2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function calcBudget(num: number, days: number, budge: number): number {
  return roundTo2((num / (days * budge)) * 100);
}

export function calcWidth(budge: number): number {
  return roundTo2((budge / 125) * 100);
}
