import * as React from "react";
import { Text } from "./Text";
import { Stack } from "./Stack";
import { Circle, ArrowRightCircle, TrendingUp } from "lucide-react";

export type ProofStripProps = {
  stage: "receipt" | "transfer" | "trajectory";
  subtitle?: string;
};

const labels = {
  receipt: "Receipt",
  transfer: "Transfer",
  trajectory: "Trajectory"
} as const;

const icons = {
  receipt: Circle,
  transfer: ArrowRightCircle,
  trajectory: TrendingUp
} as const;

export function ProofStrip({ stage, subtitle }: ProofStripProps) {
  const stages: Array<"receipt" | "transfer" | "trajectory"> = ["receipt", "transfer", "trajectory"];
  
  return (
    <Stack gap={1}>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
        {stages.map((s) => {
          const active = s === stage;
          const IconComp = icons[s];
          return (
            <React.Fragment key={s}>
              <div style={{ display: 'inline-flex', gap: 'var(--space-1)', alignItems: 'center' }}>
                <IconComp 
                  size={14} 
                  color={active ? 'var(--color-receipt)' : 'var(--color-text-muted)'} 
                />
                <Text variant="small" tone={active ? 'success' : 'muted'}>{labels[s]}</Text>
              </div>
              {s !== 'trajectory' && (
                <div style={{ width: 20, height: 1, background: 'var(--color-border-default)' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {subtitle && <Text variant="small" tone="muted">{subtitle}</Text>}
    </Stack>
  );
}

export default ProofStrip;
