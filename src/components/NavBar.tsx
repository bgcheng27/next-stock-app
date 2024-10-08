"use client";

import { TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/landing/ui/input"
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-20 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">StockPro</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <form className="hidden md:block relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className={`pl-8 transition-all duration-300 ease-in-out ${
                isSearchFocused ? "w-[300px] lg:w-[400px]" : "w-[200px] lg:w-[300px]"
              }`}
              placeholder="Search stocks..."
              type="search"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </form>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Dashboard
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Portfolio
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Watchlist
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              News
            </Link>
          </nav>
        </div>
      </header>
  );
}
