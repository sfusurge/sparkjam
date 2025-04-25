function powerMod(b: number, e: number, m: number) {
    if (m === 1) {
        return 0;
    }

    let r = 1;

    while (e > 0) {
        if (e % 2 === 1) {
            r = (r * b) % m;
        }

        b = (b * b) % m;
        e = e >> 1;
    }
    return r;
}

function LCG_at_N(n: number, a: number, b: number, m: number, seed: number) {
    const multi = (seed * powerMod(a, n, m)) % m;

    const p = (a - 1) * m;
    const incre = (b * ((powerMod(a, n, p) - 1) % p)) / (a - 1);

    return Math.floor(multi + incre) % m;
}

export function getSixDigitId(
    n: number,
    param: { a: number; b: number; m: number; seed: number }
) {
    return `${LCG_at_N(n, param.a, param.b, param.m, param.seed)}`.padStart(
        6,
        '0'
    );
}

export const rngParams = Object.freeze({
    a: 57, // 8 * 7 + 1 (divisible by all prime factors of m, and is divisible by 4 since m is divisible by 4)
    b: 59,
    m: 917504, // 2^17 * 7
    seed: 123456,
});
