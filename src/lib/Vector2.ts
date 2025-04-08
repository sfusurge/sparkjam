

export function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
}

export function smoothstep(a:number, b:number, t:number){
    return lerp(a, b, t * t * (3 - 2 * t));
}

/**
 * convert point from global space to screen space.
 */
export function toScreenSpace(point: Vector2, camPos: Vector2, scale: number) {
    return point.sub(camPos).mul(scale); // cam pos is not affected by scale
}

/**
 * convert from screen space to global space
 */
export function toGlobalSpace(point: Vector2, camPos: Vector2, scale: number) {
    return point.div(scale).add(camPos); // reverse operations done in toScreenSpace()
}

/**
 * Get AABB that is the view port, aka the area the camera can currently see.
 * Used for rendering optimizations.
 * @param camPos 
 */
export function camGlobalAABB(camPos: Vector2, originalWidth: number, originalHeight: number, scale: number) {
    // again, cam location is not affected by scale.
    return new AABB(camPos, camPos.add(new Vector2(originalWidth / scale, originalHeight / scale)));
}

export class Vector2 {

    x: number;
    y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static lerp(v1: Vector2, v2: Vector2, t: number) {
        return new Vector2(
            lerp(v1.x, v2.x, t),
            lerp(v1.y, v2.y, t)
        );
    }

    static smoothstep(v1:Vector2, v2:Vector2, t:number){
        return new Vector2(
            smoothstep(v1.x, v2.x, t),
            smoothstep(v1.y, v2.y, t)
        );
    }

    /**
     * returns the mid point between the 2 vectors.
     * Same as lerp(v1, v2, 0.5);
     * @param v1 
     * @param v2 
     * @returns 
     */
    static midPoint(v1: Vector2, v2: Vector2) {
        return new Vector2(
            (v1.x + v2.x) / 2,
            (v1.y + v2.y) / 2
        )
    }

    static get ZERO() {
        return new Vector2(0, 0);
    }

    static get ONE() {
        return new Vector2(1, 1);
    }

    static get UNIT_X() {
        return new Vector2(1, 0);
    }

    static get UNIT_Y() {
        return new Vector2(0, 1);
    }

    toArr() {
        return [this.x, this.y];
    }

    toObj() {
        return {
            x: this.x,
            y: this.y
        }
    }

    static fromArr(arr: [number, number]) {
        return new Vector2(arr[0], arr[1]);
    }


    /**
     * add piece-wise
     * @param x 
     * @param y 
     */
    addp(x: number, y: number) {
        return new Vector2(this.x + x, this.y + y);
    }

    add(other: Vector2) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }


    /**
     * add in place
     * @param other 
     * @returns 
     */
    addi(other: Vector2) {
        this.x += other.x;
        this.y += other.y;
    }


    /**
     * add in place, piece-wise
     * @param x 
     * @param y 
     */
    addip(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    sub(other: Vector2) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    subp(x:number, y:number){
        return new Vector2(this.x - x, this.y - y);
    }


    mul(factor: number) {
        return new Vector2(this.x * factor, this.y * factor);
    }

    div(quotient: number) {
        return new Vector2(this.x / quotient, this.y / quotient);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    distTo(other: Vector2) {
        return other.sub(this).mag();
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    toString() {
        return `Vector2(${this.x}, ${this.y})`
    }
}


export class AABB {
    topleft: Vector2;
    botright: Vector2;

    constructor(topleft: Vector2, botright: Vector2) {
        this.topleft = topleft;
        this.botright = botright;
    }

    get topright() {
        return new Vector2(this.botright.x, this.topleft.y);
    }

    get botleft() {
        return new Vector2(this.topleft.x, this.botright.y);
    }

    toString() {
        return `AABB(${this.topleft.toString()}, ${this.botright.toString()})`
    }

    /**
     * checks if a point is within this AABB (inclusive)
     * @param point 
     * @returns 
     */
    containsPoint(point: Vector2) {
        return (point.x >= this.topleft.x && point.y >= this.topleft.y && point.x <= this.botright.x && point.y <= this.botright.y);
    }

    /**
     * checks if this AABB fully contains the provide aabb. (inclusive)
     * @param aabb 
     */
    containsAABB(aabb: AABB | undefined) {
        if (!aabb) {
            return false;
        } // TODO this implementation is wrong
        return this.containsPoint(aabb.topleft) && this.containsPoint(aabb.botright);
    }

    cornerContain(aabb: AABB | undefined) {
        if (!aabb) {
            return false;
        }
        return this.containsPoint(aabb.topleft) || this.containsPoint(aabb.botright) || this.containsPoint(this.botleft) || this.containsPoint(this.topright);

    }

    nudgeTopLeft(diff: Vector2) {
        this.topleft.addi(diff);
    }
    nudgeTopLeftp(x: number, y: number) {
        this.topleft.addip(x, y);
    }

    nudgeBotRight(diff: Vector2) {
        this.botright.addi(diff);
    }
    nudgeBotRightp(x: number, y: number) {
        this.botright.addip(x, y);
    }

    /**
     * expand this AABB inplace to contain the given point
     * @param point 
     */
    expandToContain(point: Vector2) {
        this.topleft.x = Math.min(point.x, this.topleft.x);
        this.topleft.y = Math.min(point.y, this.topleft.y);
        this.botright.x = Math.max(point.x, this.botright.x);
        this.botright.y = Math.max(point.y, this.botright.y);
    }

    get x() {
        return this.topleft.x;
    }

    get y() {
        return this.topleft.y;
    }

    get width() {
        return this.botright.x - this.topleft.x;
    }

    get height() {
        return this.botright.y - this.topleft.y;
    }

}


/**
 * check the distance of point p to the line formed by l1 and l2
 * @param l1 
 * @param l2 
 * @param p 
 */
export function pointDistanceToLineSegment(l1: Vector2, l2: Vector2, p: Vector2) {
    // calculate distance via area of the triangle formed by the 2 points, then divide by base to get height, which distance from point to line
    // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
    const x0 = p.x, y0 = p.y;
    const x1 = l1.x, y1 = l1.y;
    const x2 = l2.x, y2 = l2.y;

    const area2 = Math.abs(
        ((y2 - y1) * x0) - ((x2 - x1) * y0) + x2 * y1 - y2 * x1
    );

    const base = l2.distTo(l1);

    return area2 / base;
}