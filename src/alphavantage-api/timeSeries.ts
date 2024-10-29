export async function getTimeSeries(symbol: string = "IBM", interval: "1min" | "5min" = "5min") {
  const res = await fetch(
    `${process.env.URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${process.env.API_KEY}`,
    { cache: "no-store" }
  );

  return res.json();
}
