export enum State {
    playing,
    losing,
    endScreen
}

export const themeColors = {
    primary: "#5555FF",
    secondary: "#ffb300",
    environment: "#6589D7",
    theme: "#BEC1C8",
    warning: "#BB0000"
}

export const anonymousAliases : string[] = 
[
    "unknown otter", "otternonymous", "random sparks"
]

export interface tierData{
    label: string,
    points: number,
    size: number,
    originalSize: number,
    icon: string
}

export const tiers : tierData[] = 
[
    {
        label: "monka",
        points: 2,
        size: 0.17,
        originalSize: 32,
        icon: "/suika/evolutions/1 - Outlined.svg"
    },
    {
        label: "shocc",
        points: 4,
        size: 0.24,
        originalSize: 42,
        icon: "/suika/evolutions/2 - Outlined.svg"
    },
    {
        label: "sobb",
        points: 6,
        size: 0.31,
        originalSize: 55,
        icon: "/suika/evolutions/3 - Outlined.svg"
    },
    {
        label: "angy",
        points: 8,
        size: 0.38,
        originalSize: 62,
        icon: "/suika/evolutions/4 - Outlined.svg"
    },
    {
        label: "pleadin",
        points: 10,
        size: 0.45,
        originalSize: 78,
        icon: "/suika/evolutions/5 - Outlined.svg"
    },
    {
        label: "wtf",
        points: 12,
        size: 0.59,
        originalSize: 100,
        icon: "/suika/evolutions/6 - Outlined.svg"
    },
    {
        label: "heart eyes",
        points: 14,
        size: 0.80,
        originalSize: 120,
        icon: "/suika/evolutions/7 - Outlined.svg"
    },
    {
        label: "love",
        points: 16,
        size: 0.94,
        originalSize: 145,
        icon: "/suika/evolutions/8 - Outlined.svg"
    },
    {
        label: "kool",
        points: 18,
        size: 1.08,
        originalSize: 198,
        icon: "/suika/evolutions/9 - Outlined.svg"
    },
    {
        label: "SURGE",
        points: 20,
        size: 1.24,
        originalSize: 241,
        icon: "/suika/evolutions/10 - Outlined.svg"
    }
]