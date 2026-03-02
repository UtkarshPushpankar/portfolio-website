"use client";

import { useEffect, useState } from "react";

type ContributionDay = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
};

type Week = ContributionDay[];

// We'll use GitHub contribution color levels
const LIGHT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const DARK_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function getMonthLabels(weeks: Week[]) {
    const labels: { label: string; x: number }[] = [];
    let lastMonth = "";
    weeks.forEach((week, i) => {
        const month = new Date(week[0].date).toLocaleString("en", { month: "short" });
        if (month !== lastMonth) {
            labels.push({ label: month, x: i });
            lastMonth = month;
        }
    });
    return labels;
}

export default function GitHubGraph({
    username = "utkarshpushpankar",
    isDark = false,
}: {
    username?: string;
    isDark?: boolean;
}) {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchContributions() {
            try {
                const res = await fetch(`/api/github?username=${username}`);
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                setWeeks(data.weeks);
                setTotalContributions(data.totalContributions);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchContributions();
    }, [username]);

    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
    const CELL_SIZE = 11;
    const CELL_GAP = 3;
    const WEEK_WIDTH = CELL_SIZE + CELL_GAP;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-28" style={{ color: "var(--text-tertiary)" }}>
                <div className="text-sm">Loading contributions...</div>
            </div>
        );
    }

    if (error || weeks.length === 0) {
        return (
            <div className="flex items-center justify-center h-28" style={{ color: "var(--text-tertiary)" }}>
                <div className="text-sm">Could not load contribution data.</div>
            </div>
        );
    }

    const monthLabels = getMonthLabels(weeks);
    const svgWidth = weeks.length * WEEK_WIDTH;
    const svgHeight = 7 * WEEK_WIDTH;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {totalContributions} contributions in the last year
                </span>
                <div className="flex items-center gap-1.5" style={{ color: "var(--text-tertiary)" }}>
                    <span className="text-xs">Less</span>
                    {colors.map((c, i) => (
                        <div
                            key={i}
                            style={{ width: 10, height: 10, borderRadius: 2, background: c }}
                        />
                    ))}
                    <span className="text-xs">More</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <svg
                    width={svgWidth}
                    height={svgHeight + 16}
                    style={{ display: "block" }}
                >
                    {/* Month labels */}
                    {monthLabels.map(({ label, x }) => (
                        <text
                            key={`${label}-${x}`}
                            x={x * WEEK_WIDTH}
                            y={9}
                            fontSize="9"
                            fill={isDark ? "#888" : "#666"}
                            fontFamily="inherit"
                        >
                            {label}
                        </text>
                    ))}

                    {/* Cells */}
                    {weeks.map((week, wi) =>
                        week.map((day, di) => (
                            <rect
                                key={day.date}
                                x={wi * WEEK_WIDTH}
                                y={di * WEEK_WIDTH + 14}
                                width={CELL_SIZE}
                                height={CELL_SIZE}
                                rx={2}
                                fill={colors[day.level]}
                            >
                                <title>{`${day.count} contributions on ${new Date(day.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`}</title>
                            </rect>
                        ))
                    )}
                </svg>
            </div>
        </div>
    );
}
