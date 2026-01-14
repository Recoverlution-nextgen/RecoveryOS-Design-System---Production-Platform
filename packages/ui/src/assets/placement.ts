export type AssetPlacement =
  | "hero"
  | "system"
  | "library"
  | "journeys"
  | "navicues"
  | "dashboard"
  | "state";

export type ComponentPlacementRule = {
  component: string;
  placement: AssetPlacement;
  labels?: string[];          // natural language
  schema?: string;            // e.g. schema_one_os_three_worlds
  budgets?: { posterKb?: number; loopKb?: number };
};

export type PlacementResolver = (componentName: string) => ComponentPlacementRule | null;