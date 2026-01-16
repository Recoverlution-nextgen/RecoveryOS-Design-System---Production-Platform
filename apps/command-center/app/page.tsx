import { fetchFeedPreview } from "../lib/supabase";
import { NervousSystemHome, Signal } from "./components/NervousSystemHome";

export const dynamic = "force-dynamic";

export default async function Page() {
  let feed = await fetchFeedPreview(7);
  if (!Array.isArray(feed)) feed = [];
  const source = feed.some((item) => (item?.id ?? "").toString().startsWith("demo-") === false) ? "Live" : "Demo";

  const signals: Signal[] = [
    { title: "RLS policy updated", detail: "Journey Studio editors: publish window locked to 7d.", time: "2m", tone: "success" },
    { title: "Consent cadence", detail: "NaviCue Studio flagged 2 journeys needing fresh consent copy.", time: "18m", tone: "warn" },
    { title: "Preview runtime", detail: "Universal Player build 0.12.4 promoted to staging.", time: "42m" },
    { title: "Signals", detail: "Trace pipeline backpressure eased after limiter tweak.", time: "1h" },
  ];

  return <NervousSystemHome feed={feed} source={source} signals={signals} />;
}

