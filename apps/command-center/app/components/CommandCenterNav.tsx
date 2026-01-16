"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Nervous System", description: "Visual truth + stream" },
  { href: "/build-lab", label: "Build Lab", description: "Studios + assembly" },
  { href: "/governance", label: "Governance", description: "Safety + reliability" },
] as const;

export function CommandCenterNav() {
  const pathname = usePathname();

  return (
    <div className="ui-nav">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={`ui-nav-item ${active ? "active" : ""}`}>
            <div>{item.label}</div>
            <span>{item.description}</span>
          </Link>
        );
      })}
    </div>
  );
}
