'use client'

import Link from "next/link"
import { Button } from "@/components/landing/ui/button"
import { Input } from "@/components/landing/ui/input"
import { TrendingUp, PieChart, Bell, } from "lucide-react"

export function StockAppLandingComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master the Market with StockPro
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Real-time stock tracking, advanced analytics, and personalized insights to help you make informed investment decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Real-time Tracking</h3>
                <p className="text-muted-foreground text-center">Stay updated with live stock prices and market movements.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <PieChart className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Advanced Analytics</h3>
                <p className="text-muted-foreground text-center">Powerful tools to analyze stock performance and market trends.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Bell className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Custom Alerts</h3>
                <p className="text-muted-foreground text-center">Set personalized notifications for price changes and market events.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Investing Smarter Today</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of successful investors using StockPro to navigate the markets with confidence.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 StockPro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}