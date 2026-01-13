export type Lens = "individual" | "professional" | "organisation";
export type StateBand = "low" | "medium" | "high";

export interface SnapshotRoute {
  name: string;
  path: string; // on docs/registry site
}

export const LENSES: Lens[] = ["individual", "professional", "organisation"];
export const BANDS: StateBand[] = ["low", "medium", "high"];

/**
 * Convention: registry exposes /snapshot?object=<ObjectName>&lens=&band=&state=
 * state is object-specific (default/hover/active/focus/disabled/loading/error etc.)
 */
export const snapshotRoutes: SnapshotRoute[] = [
  { name: "ReturnButton/default", path: "/snapshot?object=ReturnButton&state=default" },
  { name: "ReturnButton/focus", path: "/snapshot?object=ReturnButton&state=focus" },
  { name: "ReturnButton/loading", path: "/snapshot?object=ReturnButton&state=loading" },

  { name: "PortalShell/default", path: "/snapshot?object=PortalShell&state=default" },

  { name: "RoomFrame/default", path: "/snapshot?object=RoomFrame&state=default" },

  { name: "Rails/primary", path: "/snapshot?object=Rails&rail=primary" },
  { name: "Rails/context", path: "/snapshot?object=Rails&rail=context" },
  { name: "Rails/artifact", path: "/snapshot?object=Rails&rail=artifact" },

  { name: "Toast/neutral", path: "/snapshot?object=Toast&kind=neutral" },
  { name: "Toast/confirm", path: "/snapshot?object=Toast&kind=confirm" },

  { name: "ReceiptCard/default", path: "/snapshot?object=ReceiptCard&state=default" },
  { name: "ReceiptCard/redacted", path: "/snapshot?object=ReceiptCard&state=redacted" },

  { name: "UniversalPlayer/audio", path: "/snapshot?object=UniversalPlayer&kind=audio" },
  { name: "UniversalPlayer/text", path: "/snapshot?object=UniversalPlayer&kind=text" },

  { name: "LoadIndicator/pill", path: "/snapshot?object=LoadIndicator&variant=pill" },
  { name: "TraceTravel/dot", path: "/snapshot?object=TraceTravel&variant=dot" },

  { name: "NaviCueCard/default", path: "/snapshot?object=NaviCueCard&state=default" },
  { name: "ProofSeal/pulse", path: "/snapshot?object=ProofSeal&profile=pulse" },

  { name: "ConsoleOverlay/default", path: "/snapshot?object=ConsoleOverlay&state=default" }
];