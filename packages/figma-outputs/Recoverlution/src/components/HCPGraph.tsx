import hcpGraphImage from "figma:asset/167b74d1860e3187208c2fbab81dd0a686171ed9.png";

export function HCPGraph() {
  return (
    <div className="relative w-full">
      <img 
        src={hcpGraphImage} 
        alt="The Human Cognition Platform (HCP) - Visualizing how Recoverlution scales from Happy Person to Happy Society across Health, Growth, Relationships, and Purpose domains through three architectural layers: Recoverlution OS (the engine), Recoverlution Orbit (the experience), and Recoverlution Proof (the currency)"
        className="w-full h-auto"
      />
    </div>
  );
}
