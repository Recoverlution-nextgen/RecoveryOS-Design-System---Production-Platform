import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#5739FB]/40",
  {
    variants: {
      variant: {
        // Primary - Brand gradient (main CTAs) - Momentum elegant hover (no lift!)
        default: "bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#2E1B98] hover:to-[#4729DB] text-white shadow-[0_2px_12px_rgba(62,43,184,0.25)] hover:shadow-[0_4px_20px_rgba(62,43,184,0.35)]",
        
        // Destructive - Red for dangerous actions
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        
        // Outline - Glass border style
        outline: "border border-gray-200/60 bg-white/95 backdrop-blur-[40px] backdrop-saturate-[180%] text-[#1A1A1A] hover:bg-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.5)_inset]",
        
        // Secondary - Subtle purple tint
        secondary: "bg-[#F5F3FF] text-[#3E2BB8] hover:bg-[#EDE9FE] border border-[#3E2BB8]/10",
        
        // Ghost - Minimal hover
        ghost: "text-gray-600 hover:bg-gray-100/60 hover:text-[#1A1A1A]",
        
        // Link - Text only
        link: "text-[#3E2BB8] underline-offset-4 hover:underline",
      },
      size: {
        // Default - Standard button
        default: "h-10 px-5 py-2.5 rounded-[12px] has-[>svg]:px-4",
        
        // Small - Compact
        sm: "h-9 px-3 py-2 rounded-[10px] gap-1.5 has-[>svg]:px-2.5 text-sm",
        
        // Large - Hero CTAs
        lg: "h-12 px-8 py-3 rounded-[14px] has-[>svg]:px-6 text-base",
        
        // XL - Extra large for main actions
        xl: "h-14 px-10 py-4 rounded-[14px] has-[>svg]:px-8 text-lg",
        
        // Icon - Square
        icon: "size-10 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      style={{ 
        fontFamily: 'var(--font-display)', 
        fontWeight: 600,
        ...(props.style || {})
      }}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
