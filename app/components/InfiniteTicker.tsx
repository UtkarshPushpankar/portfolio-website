"use client";

import { useRef, useEffect } from "react";

interface InfiniteTickerProps {
    direction?: "x" | "y" | "x-reverse";
    speed?: "slow" | "normal" | "fast";
    children: React.ReactNode;
    className?: string;
}

export default function InfiniteTicker({
    direction = "x",
    children,
    className = "",
}: InfiniteTickerProps) {
    const trackClass =
        direction === "x"
            ? "ticker-track-x"
            : direction === "x-reverse"
                ? "ticker-track-x-reverse"
                : "ticker-track-y";

    const wrapClass = direction === "y" ? "ticker-wrap-y" : "ticker-wrap-x";

    return (
        <div className={`${wrapClass} ${className}`}>
            <div className={trackClass}>
                {children}
                {children}
            </div>
        </div>
    );
}
