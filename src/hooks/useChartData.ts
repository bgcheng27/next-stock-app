import { useMemo } from "react";
import { formatTwoDecimalPlaces } from "@/ts/formatTwoDecimalPlaces";
import { setIntradayArray } from "@/ts/setIntradayArray";
import { ModifiedStockDataProps, TimeSeriesData } from "@/ts/types";

export function useChartData(
  lastTradingDay: string,
  timeSeriesData: TimeSeriesData,
) {

  const sortedData: ModifiedStockDataProps[] = useMemo(() => {
    const initialData = Object.keys(timeSeriesData)
      .map((key) => ({
        dateTime: {
          string: key,
          value: new Date(key),
        },
        open: formatTwoDecimalPlaces(timeSeriesData[key]["1. open"]),
        volume: Number(timeSeriesData[key]["5. volume"]).toLocaleString(),
      }))
      .filter((data) => {
        const hours = data.dateTime.value.getHours();
        const minutes = data.dateTime.value.getMinutes();
        return (
          (hours > 9 || (hours === 9 && minutes >= 30)) &&
          (hours < 16 || (hours === 16 && minutes === 0))
        );
      })
      .sort(
        (a, b) =>
          new Date(a.dateTime.value).getTime() - new Date(b.dateTime.value).getTime()
      );

    return initialData;
  }, [timeSeriesData]);

  const oneDayArray = setIntradayArray(lastTradingDay,  sortedData, "1D");
  const oneWeekArray = setIntradayArray(lastTradingDay, sortedData, "1W");
  const oneMonthArray = setIntradayArray(lastTradingDay, sortedData, "1M");


  function getYAxisDomain(previousClose: number | string | undefined, array: ModifiedStockDataProps[]) {
    let min = Math.min(...array.map((item) => Number(item.open)));
    let max = Math.max(...array.map((item) => Number(item.open)));

    if (previousClose !== undefined) {
      min = Math.min(min, Number(previousClose));
      max = Math.max(max, Number(previousClose));
    }

    return [min * 0.999, max * 1.001];
  }

  const LINE_GREEN = "hsl(150, 75%, 45%)";
  const LINE_RED = "hsl(5, 78%, 57%)";

  function configLineColor(previousClose: number | string | undefined, array: ModifiedStockDataProps[]) { 
    if (previousClose !== undefined) {
      return Number(array[array.length - 1].open) > Number(previousClose) ? LINE_GREEN : LINE_RED;
    } else {
      return Number(array[array.length - 1].open) > Number(array[0].open) ? LINE_GREEN : LINE_RED;
    }
  }

  return { sortedData, oneDayArray, oneWeekArray, oneMonthArray, getYAxisDomain, configLineColor };
}
