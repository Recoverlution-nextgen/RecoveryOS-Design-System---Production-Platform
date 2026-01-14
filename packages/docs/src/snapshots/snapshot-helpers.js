export function parseBand(q) {
    if (q === "low" || q === "medium" || q === "high")
        return q;
    return "medium";
}
export function parseLens(q) {
    if (q === "individual" || q === "professional" || q === "organisation")
        return q;
    return "individual";
}
