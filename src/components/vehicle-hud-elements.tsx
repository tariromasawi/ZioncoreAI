
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

/**
 * Scanlines Overlay
 * Adds a subtle, retro scanline effect over its container.
 */
export const Scanlines = () => (
    <div 
      className="pointer-events-none absolute inset-0 z-50 bg-repeat"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '100% 3px',
      }}
    />
);

/**
 * HudPanel
 * A container with a futuristic, angled look.
 */
interface HudPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HudPanel = React.forwardRef<HTMLDivElement, HudPanelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card/80 backdrop-blur-sm border border-primary/20 p-1",
        "relative before:absolute before:inset-0 before:border-primary/20 before:p-1 before:content-[''] before:border",
        "clip-path-futuristic", // Custom clip-path
        className
      )}
      style={{
        clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))'
      }}
      {...props}
    />
  )
);
HudPanel.displayName = 'HudPanel';

/**
 * HudButton
 * A button styled for the futuristic HUD.
 */
const hudButtonVariants = cva(
    "group relative flex w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-none p-2 text-left text-xs outline-none ring-ring transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            isActive: {
                true: "bg-primary/20 text-primary font-bold before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:shadow-[0_0_10px_theme(colors.cyan.500)]",
                false: "text-primary/70 hover:bg-primary/10 hover:text-primary",
            },
        },
        defaultVariants: {
            isActive: false,
        },
    }
);

interface HudButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hudButtonVariants> {}

export const HudButton = React.forwardRef<HTMLButtonElement, HudButtonProps>(
  ({ className, isActive, ...props }, ref) => (
    <button ref={ref} className={cn(hudButtonVariants({ isActive }), className)} {...props} />
  )
);
HudButton.displayName = 'HudButton';


/**
 * GlitchText
 * A component to render text with a glitch effect.
 */
interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export const GlitchText = React.forwardRef<HTMLSpanElement, GlitchTextProps>(
    ({ text, className, ...props }, ref) => (
        <span
            ref={ref}
            className={cn("relative inline-block", className)}
            {...props}
        >
            <span className="absolute inset-0 animate-[hud-glitch_500ms_infinite] opacity-80" aria-hidden="true">{text}</span>
            {text}
        </span>
    )
);
GlitchText.displayName = 'GlitchText';
