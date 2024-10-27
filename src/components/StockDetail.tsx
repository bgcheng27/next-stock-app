"use client";


import { AreaChart } from "./AreaChart";
import { formatTwoDecimalPlaces } from "@/ts/formatTwoDecimalPlaces";
import { useState, createContext } from "react";
import { StockHeader } from "./StockHeader";
import { StockDetailProps } from "@/ts/types";

export const ReferencePriceContext = createContext<{
  referencePrice: string;
  setReferencePrice: (price: string) => void;
  suffix: string;
  setSuffix: (value: string) => void; 
} | null>(null);

export function StockDetail({
  title,
  quoteData,
  timeSeriesData,
  lastTradingDay,
}: StockDetailProps) {
  const [referencePrice, setReferencePrice] = useState<string>(
    formatTwoDecimalPlaces(Number(quoteData.previousClose))
  );
  const [suffix, setSuffix] = useState<string>("today")

  return (
    <>
      <ReferencePriceContext.Provider
        value={{ referencePrice, setReferencePrice, suffix, setSuffix }}
      >
        <StockHeader
          title={title}
          currentPrice={quoteData.price}
        />

        <AreaChart
          timeSeriesData={timeSeriesData}
          lastTradingDay={lastTradingDay}
          previousClose={quoteData.previousClose}
        />
      </ReferencePriceContext.Provider>
    </>
  );
}
