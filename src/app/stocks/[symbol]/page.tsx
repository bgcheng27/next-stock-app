import { StockDetail } from "@/components/stock-detail";

export default async function StockPage({ params }: { params: { symbol: string } }) {
  const res = await fetch(`${process.env.URL}/query?function=OVERVIEW&symbol=IBM&apikey=demo`)
  const overview = await res.json();

  return <StockDetail tickerSymbol={overview["Symbol"]} companyName={overview["Name"]}/>
}