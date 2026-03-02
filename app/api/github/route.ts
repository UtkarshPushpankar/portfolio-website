import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "utkarshpushpankar";

    try {
        const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
            body: JSON.stringify({ query, variables: { username } }),
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status}`);
        }

        const json = await res.json();
        const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            throw new Error("No calendar data found");
        }

        const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
        };

        const formattedWeeks = calendar.weeks.map((week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
            week.contributionDays.map((day: { date: string; contributionCount: number; contributionLevel: string }) => ({
                date: day.date,
                count: day.contributionCount,
                level: levelMap[day.contributionLevel] ?? 0,
            }))
        );

        return NextResponse.json({
            totalContributions: calendar.totalContributions,
            weeks: formattedWeeks,
        });
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch GitHub contributions" },
            { status: 500 }
        );
    }
}
