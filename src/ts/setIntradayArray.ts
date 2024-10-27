import { ModifiedStockDataProps, TimeInterval } from "./types";

const INTERVAL_MAP = {
  "1D": 1,
  "1W": 5,
  "1M": 30,
}

export function getIntervalStartDate(dataArray: ModifiedStockDataProps[], latestTradingDay: string, daysAgo: number) {
  if (daysAgo === 1) {
    return latestTradingDay;
  }

  const offset = daysAgo - 1


  const latestTradingDate = new Date(latestTradingDay);
  const estimatedStartDate = new Date(latestTradingDate);
  estimatedStartDate.setDate(latestTradingDate.getDate() - offset)

  const estimatedDateString = estimatedStartDate.toISOString().split("T")[0];

  const foundDate = dataArray.find(item => item.dateTime.string.startsWith(estimatedDateString));
  if (foundDate) {
    return estimatedDateString;
  }

  // If not found, check for the closest available date
  const closestDate = dataArray
    .filter(item => new Date(item.dateTime.string.split(" ")[0]) <= estimatedStartDate)
    .sort((a, b) => new Date(b.dateTime.string).getTime() - new Date(a.dateTime.string).getTime())[0];

  // Return the closest available date or the earliest date in the dataArray if no suitable date is found
  return closestDate ? closestDate.dateTime.string.split(" ")[0] : dataArray[0].dateTime.string.split(" ")[0];
}

export function setIntradayArray(
  latestTradingDay: string,
  dataArray: ModifiedStockDataProps[],
  interval: TimeInterval,
): ModifiedStockDataProps[] {
  const startDate = getIntervalStartDate(dataArray, latestTradingDay, INTERVAL_MAP[interval]);

  const startIndex = dataArray.findIndex(
    (data) => data.dateTime.string === `${startDate} 09:30:00`
  );
  const endIndex = dataArray.findIndex(
    (data) => data.dateTime.string === `${latestTradingDay} 16:00:00`
  );

  const initialArray = dataArray.slice(startIndex, endIndex + 1);

  switch (interval) {
    case "1W":
      return initialArray.filter((item) => {
        const minute = item.dateTime.string.split(" ")[1].split(":")[1];
        return minute === "30" || minute === "00";
      });
    case "1M":
      return initialArray.filter((item) => item.dateTime.string.endsWith("16:00:00"));
    default:
      return initialArray;
  }
}
