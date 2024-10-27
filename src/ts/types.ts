export type TimeInterval = "1D" | "1W" | "1M";



export type StockDetailProps = {
  title: StockTitleProps;
  quoteData: {
    price: number | string;
    previousClose: number | string;
    dividendYield: number | string;
    dayRange: {
      low: number | string;
      high: number | string;
    };
    yearRange: {
      low: number | string;
      high: number | string;
    };
    volume: number | string;
    primaryExchange: string;
  };
  timeSeriesData: TimeSeriesData;
  lastTradingDay: string;
};

export type StockTitleProps = {
  tickerSymbol: string;
  companyName: string;
};

export interface IntervalData {
  data: ModifiedStockDataProps[];
  previousClose?: number | string;
  referencePrice: number | string;
  suffix: "today" | "past week" | "past month";
  tickFormatter: (dateTImeString: string) => string;
}

export type DataMap = {
  [key in TimeInterval | string]: IntervalData;
};

export type TimeSeriesData = {
  [key: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

export type ModifiedStockDataProps = {
  dateTime: {
    string: string,
    value: Date
  };
  open: string;
  volume: string;
};
