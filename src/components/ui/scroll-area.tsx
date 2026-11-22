"use client"

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * SOVEREIGN SCROLLAREA v2.2
 * RE-ENGINEERED FOR SUPREME MOBILITY & TOUCH APOTHEOSIS
 */

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden h-full w-full flex flex-col", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] outline-none touch-pan-y scroll-smooth overscroll-contain flex-1">
      <div className="min-h-full w-full">
        {children}
      </div>
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-all duration-300 z-[100] bg-black/5 rounded-none",
      orientation === "vertical" &&
        "h-full w-2 border-l border-l-primary/10 p-[1px]",
      orientation === "horizontal" &&
        "h-2 flex-col border-t border-t-primary/10 p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-none bg-primary/40 hover:bg-primary/80 transition-colors shadow-[0_0_15px_gold] active:bg-primary/90" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
