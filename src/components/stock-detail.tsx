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

export function StockDetail({ tickerSymbol, companyName }: any) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedInterval, setSelectedInterval] = useState("1D")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{tickerSymbol} - {companyName}</h1>
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
                  <LineChart data={stockData[selectedInterval]}>
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
                    <dt className="text-sm font-medium text-muted-foreground">Open</dt>
                    <dd className="text-lg font-semibold">$168.20</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Previous Close</dt>
                    <dd className="text-lg font-semibold">$168.41</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Day's Range</dt>
                    <dd className="text-lg font-semibold">$167.54 - $170.92</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">52 Week Range</dt>
                    <dd className="text-lg font-semibold">$124.17 - $198.23</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Volume</dt>
                    <dd className="text-lg font-semibold">52,379,969</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Avg. Volume</dt>
                    <dd className="text-lg font-semibold">56,206,428</dd>
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
                    <dt className="text-sm font-medium text-muted-foreground">Market Cap</dt>
                    <dd className="text-lg font-semibold">$2.67T</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">P/E Ratio</dt>
                    <dd className="text-lg font-semibold">28.23</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Dividend Yield</dt>
                    <dd className="text-lg font-semibold">0.51%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">EPS (TTM)</dt>
                    <dd className="text-lg font-semibold">$6.13</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Beta</dt>
                    <dd className="text-lg font-semibold">1.28</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">1y Target Est</dt>
                    <dd className="text-lg font-semibold">$199.26</dd>
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