import { ModifiedStockDataProps, TimeInterval } from "./types";

const INTERVAL_MAP = {
  "1D": 1,
  "1W": 5,
  "1M": 30,
};

export function getIntervalStartDate(
  dataArray: ModifiedStockDataProps[],
  daysAgo: number
) {

  const uniqueDates = new Set();

  for (let i = dataArray.length - 1; i >= 0; i--) {
    const date = dataArray[i].dateTime.string.split(" ")[0]
    uniqueDates.add(date);

    if (uniqueDates.size === daysAgo) {
      return date;
    }
  }

  // in case we don't reach (1M will be on the margin), we just return the start of the array we received
  return dataArray[0].dateTime.string.split(" ")[0];
}

export function setIntradayArray(
  latestTradingDay: string,
  dataArray: ModifiedStockDataProps[],
  interval: TimeInterval
): ModifiedStockDataProps[] {
  const startDate = getIntervalStartDate(dataArray, INTERVAL_MAP[interval]);

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
      return initialArray.filter((item) =>
        item.dateTime.string.endsWith("16:00:00")
      );
    default:
      return initialArray;
  }
}
