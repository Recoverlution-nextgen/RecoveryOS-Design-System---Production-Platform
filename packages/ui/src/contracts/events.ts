export type Lens = "individual" | "professional" | "organisation";
export type StateBand = "low" | "medium" | "high";

export type UiEvent =
  | { type: "return.invoked"; method: "tap" | "keyboard" | "hold"; lens: Lens; band: StateBand; ts: number }
  | { type: "rail.select"; rail: "primary" | "context" | "artifact"; id: string; method: "pointer" | "keyboard"; ts: number }
  | { type: "toast.dismiss"; id: string; reason: "close_btn" | "timeout" | "programmatic"; ts: number }
  | { type: "receipt.open"; id: string; ts: number };

export type Emit = (e: UiEvent) => void;