"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartData } from "@/hooks/useChartData";

import { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { format1DTimeXAxis, format1WTimeXAxis, format1MTimeXAxis } from "@/ts/tickFormatters";
import { ReferencePriceContext } from "./StockDetail";
import { DataMap, TimeSeriesData } from "@/ts/types";

export function AreaChart({
  timeSeriesData,
  lastTradingDay,
  previousClose, // Add this prop type
}: {
  timeSeriesData: TimeSeriesData;
  lastTradingDay: string;
  previousClose: number | string; 
}) {
  const [selectedInterval, setSelectedInterval] = useState("1D");
  const context = useContext(ReferencePriceContext);

  if (!context) {
    // Handle the case where context is null (e.g., throw an error or return null)
    throw new Error("ReferencePriceContext is not available");
  }

  const { setReferencePrice, setSuffix } = context

  const { oneDayArray, oneWeekArray, oneMonthArray, getYAxisDomain, configLineColor } = useChartData(lastTradingDay, timeSeriesData);

  const dataMap: DataMap = {
    "1D": {
      data: oneDayArray,
      previousClose: previousClose,
      referencePrice: previousClose,
      suffix: "today",
      tickFormatter: format1DTimeXAxis,
    },
    "1W": {
      data: oneWeekArray,
      previousClose: undefined,
      referencePrice: oneWeekArray[0].open,
      suffix: "past week",
      tickFormatter: format1WTimeXAxis,
    },
    "1M": {
      data: oneMonthArray,
      previousClose: undefined,
      referencePrice: oneMonthArray[0].open,
      suffix: "past month",
      tickFormatter: format1MTimeXAxis,
    },
  } as const;

  const [graph, setGraph] = useState(dataMap["1D"]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-start space-x-2">
          {Object.keys(dataMap).map((interval) => (
            <Button
              key={interval}
              variant={selectedInterval === interval ? "default" : "outline"}
              onClick={() => { 
                setSelectedInterval(interval);
                setReferencePrice(dataMap[interval].referencePrice as string);
                setSuffix(dataMap[interval].suffix)
                setGraph(dataMap[interval]);
              }}
            >
              {interval}
            </Button>
          ))}
        </div>
        <ChartContainer
          config={{
            price: {
              label: "Stock Price",
              color: "hsl(158 75.4% 44.7%)",
            },
            previousClose: {
              label: "Previous Close",
              color: "hsl(0 72% 51%)",
            },
          }}
          className="h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graph.data}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                dataKey="dateTime.string"
                tickFormatter={graph.tickFormatter}
                interval={0}
                tickLine={false}
                tickMargin={5}
              />
              <YAxis
                domain={getYAxisDomain(graph.previousClose, graph.data)}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tickCount={8}
                tickLine={false}
                tickMargin={5}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="linear"
                dataKey="open"
                stroke={configLineColor(graph.previousClose, graph.data)}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              {graph.previousClose && <ReferenceLine
                y={graph.previousClose}
                stroke="var(--color-previousClose)"
                strokeDasharray="3 3"
                label={{
                  value: `Previous Close: $${Number(previousClose).toFixed(2)}`,
                  position: "insideTopLeft",
                }}
              />}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
