export async function getTimeSeries() {
  const res = await fetch(
    `${process.env.URL}/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo`,
    { cache: "no-store" }
  );

  return res.json();
}
