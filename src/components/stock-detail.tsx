"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for the stock chart
const stockData = {
  "1D": [
    { date: "09:30", price: 150 },
    { date: "10:30", price: 152 },
    { date: "11:30", price: 151 },
    { date: "12:30", price: 153 },
    { date: "13:30", price: 155 },
    { date: "14:30", price: 154 },
    { date: "15:30", price: 156 },
    { date: "16:00", price: 155 },
  ],
  "5D": [
    { date: "Mon", price: 150 },
    { date: "Tue", price: 152 },
    { date: "Wed", price: 154 },
    { date: "Thu", price: 153 },
    { date: "Fri", price: 155 },
  ],
  "1M": [
    { date: "Week 1", price: 150 },
    { date: "Week 2", price: 152 },
    { date: "Week 3", price: 155 },
    { date: "Week 4", price: 158 },
  ],
  "1Y": [
    { date: "Jan", price: 150 },
    { date: "Feb", price: 155 },
    { date: "Mar", price: 160 },
    { date: "Apr", price: 158 },
    { date: "May", price: 162 },
    { date: "Jun", price: 165 },
    { date: "Jul", price: 170 },
    { date: "Aug", price: 168 },
    { date: "Sep", price: 172 },
    { date: "Oct", price: 175 },
    { date: "Nov", price: 173 },
    { date: "Dec", price: 170 },
  ],
}

type StockDetailProps = {
  title: {
    tickerSymbol: string,
    companyName: string
  },
  quoteData: {
    previousClose: string,
    dividendYield: string,
    dayRange: {
      low: string,
      high: string
    },
    yearRange: {
      low: string,
      high: string,
    },
    volume: string,
    primaryExchange: string,
  },
  statistics: {
    peRatio: string,
    priceSalesRatio: string,
    eps: string,
    beta: string,
    marketCap: string,
    analystTargetPrice: string
  }
}

export function StockDetail({ title, quoteData, statistics }: StockDetailProps) {
  const [selectedInterval, setSelectedInterval] = useState("1D")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{title.tickerSymbol} - {title.companyName}</h1>
            <div className="text-2xl font-semibold">$170.35 <span className="text-green-500 text-lg">+2.15 (1.28%)</span></div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-start space-x-2">
                {["1D", "5D", "1M", "1Y"].map((interval) => (
                  <Button
                    key={interval}
                    variant={selectedInterval === interval ? "default" : "outline"}
                    onClick={() => setSelectedInterval(interval)}
                  >
                    {interval}
                  </Button>
                ))}
              </div>
              <ChartContainer
                config={{
                  price: {
                    label: "Stock Price",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData[selectedInterval as keyof typeof stockData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quote Data</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Previous Close</dt>
                    <dd className="text-lg font-semibold">${quoteData.previousClose}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Dividend Yield</dt>
                    <dd className="text-lg font-semibold">{quoteData.dividendYield}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Day&apos;s Range</dt>
                    <dd className="text-lg font-semibold">${quoteData.dayRange.low} - ${quoteData.dayRange.high}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">52 Week Range</dt>
                    <dd className="text-lg font-semibold">${quoteData.yearRange.low} - ${quoteData.yearRange.high}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Volume</dt>
                    <dd className="text-lg font-semibold">{quoteData.volume}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Primary Exchange</dt>
                    <dd className="text-lg font-semibold">{quoteData.primaryExchange}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">P/E Ratio</dt>
                    <dd className="text-lg font-semibold">{statistics.peRatio}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Price/Sales Ratio</dt>
                    <dd className="text-lg font-semibold">{statistics.priceSalesRatio}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">EPS (TTM)</dt>
                    <dd className="text-lg font-semibold">${statistics.eps}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Beta</dt>
                    <dd className="text-lg font-semibold">{statistics.beta}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Market Cap</dt>
                    <dd className="text-lg font-semibold">${statistics.marketCap}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Analyst Target Price</dt>
                    <dd className="text-lg font-semibold">${statistics.analystTargetPrice}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© 2024 StockPro. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}