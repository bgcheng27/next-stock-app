import { getOverview, getQuote } from "@/alphavantage-api/overview";
import { StockDetail } from "@/components/stock-detail";


function formatTwoDecimalPlaces(number: number | string): string {
  return Number(number).toFixed(2)
}

function formatMarketCap(value: string | number): string {
  const num = Number(value);
  if (isNaN(num)) return 'N/A';

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(num) / 3);
  const scaled = num / Math.pow(10, magnitude * 3);
  const formatted = scaled.toFixed(2);

  return `${formatted}${suffixes[magnitude]}`;
}


export default async function StockPage() {
  const [overview, quote] = await Promise.all([getOverview(), getQuote()]);
  const globalQuote = quote["Global Quote"]

  const title = {
    tickerSymbol: overview["Symbol"],
    companyName: overview["Name"]
  }

  const quoteData = {
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
  }

  const statistics = {
    peRatio: formatTwoDecimalPlaces(overview["PERatio"]),
    priceSalesRatio: formatTwoDecimalPlaces(overview["PriceToSalesRatioTTM"]),
    eps: formatTwoDecimalPlaces(overview["EPS"]),
    beta: formatTwoDecimalPlaces(overview["Beta"]),
    marketCap: formatMarketCap(overview["MarketCapitalization"]),
    analystTargetPrice: formatTwoDecimalPlaces(overview["AnalystTargetPrice"]),
  }



  return <StockDetail title={title} quoteData={quoteData} statistics={statistics}/>
}