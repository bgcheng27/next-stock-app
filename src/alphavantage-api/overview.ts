export async function getOverview() {
  const res = await fetch(
    `${process.env.URL}/query?function=OVERVIEW&symbol=IBM&apikey=demo`
  );

  return res.json();
}

export async function getQuote() {
  const res = await fetch(
    `${process.env.URL}/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
  );

  return res.json();
}
