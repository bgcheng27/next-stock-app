import { getOverview, getQuote } from "@/alphavantage-api/overview";
import { getTimeSeries } from "@/alphavantage-api/timeSeries";
import { StockDetail } from "@/components/StockDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeSeriesData } from "@/ts/types";
import { formatTwoDecimalPlaces } from "@/ts/formatTwoDecimalPlaces";

function formatMarketCap(value: string | number): string {
  const num = Number(value);
  if (isNaN(num)) return "N/A";

  const suffixes = ["", "K", "M", "B", "T"];
  const magnitude = Math.floor(Math.log10(num) / 3);
  const scaled = num / Math.pow(10, magnitude * 3);
  const formatted = scaled.toFixed(2);

  return `${formatted}${suffixes[magnitude]}`;
}

export default async function StockPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase();
  const interval = "1min"

  const [overview, quote, timeSeries] = await Promise.all([
    getOverview(symbol),
    getQuote(symbol),
    getTimeSeries(symbol, interval),
  ]);
  const globalQuote = quote["Global Quote"];

  const title = {
    tickerSymbol: overview["Symbol"],
    companyName: overview["Name"],
  };

  const quoteData = {
    price: formatTwoDecimalPlaces(globalQuote["05. price"]),
    previousClose: formatTwoDecimalPlaces(globalQuote["08. previous close"]),
    dividendYield: formatTwoDecimalPlaces(overview["DividendYield"]),
    dayRange: {
      low: formatTwoDecimalPlaces(globalQuote["04. low"]),
      high: formatTwoDecimalPlaces(globalQuote["03. high"]),
    },
    yearRange: {
      low: formatTwoDecimalPlaces(overview["52WeekLow"]),
      high: formatTwoDecimalPlaces(overview["52WeekHigh"]),
    },
    volume: Number(globalQuote["06. volume"]).toLocaleString(),
    primaryExchange: overview["Exchange"],
  };

  const statistics = {
    peRatio: formatTwoDecimalPlaces(overview["PERatio"]),
    priceSalesRatio: formatTwoDecimalPlaces(overview["PriceToSalesRatioTTM"]),
    eps: formatTwoDecimalPlaces(overview["EPS"]),
    beta: formatTwoDecimalPlaces(overview["Beta"]),
    marketCap: formatMarketCap(overview["MarketCapitalization"]),
    analystTargetPrice: formatTwoDecimalPlaces(overview["AnalystTargetPrice"]),
  };

  const timeSeriesData: TimeSeriesData = timeSeries[`Time Series (${interval})`];

  const lastTradingDay =
    timeSeries["Meta Data"]["3. Last Refreshed"].split(" ")[0];

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-6 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <StockDetail
              title={title}
              quoteData={quoteData}
              timeSeriesData={timeSeriesData}
              lastTradingDay={lastTradingDay}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Previous Close
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${quoteData.previousClose}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Dividend Yield
                      </dt>
                      <dd className="text-lg font-semibold">
                        {quoteData.dividendYield}%
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Day&apos;s Range
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${quoteData.dayRange.low} - ${quoteData.dayRange.high}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        52 Week Range
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${quoteData.yearRange.low} - ${quoteData.yearRange.high}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Volume
                      </dt>
                      <dd className="text-lg font-semibold">
                        {quoteData.volume}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Primary Exchange
                      </dt>
                      <dd className="text-lg font-semibold">
                        {quoteData.primaryExchange}
                      </dd>
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
                      <dt className="text-sm font-medium text-muted-foreground">
                        P/E Ratio
                      </dt>
                      <dd className="text-lg font-semibold">
                        {statistics.peRatio}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Price/Sales Ratio
                      </dt>
                      <dd className="text-lg font-semibold">
                        {statistics.priceSalesRatio}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        EPS (TTM)
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${statistics.eps}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Beta
                      </dt>
                      <dd className="text-lg font-semibold">
                        {statistics.beta}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Market Cap
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${statistics.marketCap}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Analyst Target Price
                      </dt>
                      <dd className="text-lg font-semibold">
                        ${statistics.analystTargetPrice}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
