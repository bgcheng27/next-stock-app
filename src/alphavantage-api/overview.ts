export async function getOverview(symbol: string) {
  const res = await fetch(
    `${process.env.URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_KEY}`,
    { cache: "no-store" }
  );

  return res.json();
}

export async function getQuote(symbol: string) {
  const res = await fetch(
    `${process.env.URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`,
    { cache: "no-store" }
  );

  return res.json();
}
