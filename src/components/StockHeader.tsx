import { formatTwoDecimalPlaces } from "@/ts/formatTwoDecimalPlaces";
import { StockTitleProps } from "@/ts/types";
import { useContext } from "react";
import { ReferencePriceContext } from "./StockDetail";

function calculatePercentChange(
  currentPrice: number | string,
  referencePrice: number | string
) {
  const currentPriceNumber = Number(currentPrice);
  const referencePriceNumber = Number(referencePrice);

  const flatValue = currentPriceNumber - referencePriceNumber;

  const percentageChange =
    ((currentPriceNumber - referencePriceNumber) / referencePriceNumber) *
    100;

  return {
    flatValue: formatTwoDecimalPlaces(flatValue),
    percentageChange: formatTwoDecimalPlaces(percentageChange),
  };
}


export function StockHeader({ title, currentPrice }: { title: StockTitleProps, currentPrice: number | string }) {
  const context = useContext(ReferencePriceContext);

  if (!context) {
    throw new Error("ReferencePriceContext is not available");
  }

  const { referencePrice, suffix } = context;

  const { flatValue, percentageChange } = calculatePercentChange(
    currentPrice,
    referencePrice
  );


  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {title.tickerSymbol} - {title.companyName}
        </h1>
        <div className="text-2xl font-semibold">
          ${currentPrice}{" "}
          <span
            className={`${Number(percentageChange) > 0 ? "text-green-500" : "text-red-500"} text-lg`}
          >
            {Number(percentageChange) > 0 && "+"}{flatValue} ({percentageChange}%) {suffix}
          </span>
        </div>
      </div>
    </>
  );
}
