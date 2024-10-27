export function formatTwoDecimalPlaces(number: number | string): string {
  return Number(number).toFixed(2);
}
