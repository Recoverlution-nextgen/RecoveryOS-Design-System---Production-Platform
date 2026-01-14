export function parseBand(q: string | null): "low" | "medium" | "high" {
  if (q === "low" || q === "medium" || q === "high") return q;
  return "medium";
}

export function parseLens(q: string | null): "individual" | "professional" | "organisation" {
  if (q === "individual" || q === "professional" || q === "organisation") return q;
  return "individual";
}
