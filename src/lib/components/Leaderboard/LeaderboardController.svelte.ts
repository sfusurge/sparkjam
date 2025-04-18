// import type { LeaderboardPosition } from "$lib/Firebase/SuikaLeaderboardManager"

interface LeaderboardPosition{
    username: string;
    points: number;
}

export const leaderboardPreset : LeaderboardPosition[] = 
[
    {
        "username": "unknown otter",
        "points": 300
    },
    {
        "username": "otternonymous",
        "points": 200
    },
    {
        "username": "random sparks",
        "points": 100
    }
]