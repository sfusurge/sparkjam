<script lang="ts">
    import {
        Engine,
        Render,
        Runner,
        Common,
        Composite,
        Svg,
        Bodies,
        type Vector,
        Mouse,
        MouseConstraint,
        Body,
        type World,
    } from "matter-js";
    import { onMount } from "svelte";
    import "./pathseg.js";
    // @ts-ignore
    import PolyDecomp from "poly-decomp";
    import { cubicOut } from "svelte/easing";

    interface Props {
        width: number;
        height: number;
    }

    const { width, height }: Props = $props();

    let container = $state<HTMLDivElement>();
    const svgs: Record<
        "arrow" | "asterisk" | "box" | "otter" | "pencil" | "star" | "surge" | "bundle",
        { shape: string; img: string; verticies?: Vector[][] | undefined }
    > = {
        arrow: {
            img: "./home/arrow.svg",
            shape: "./home/arrowShape.svg",
        },
        asterisk: {
            img: "./home/asterisk.svg",
            shape: "./home/asterisk.svg",
        },
        box: {
            img: "./home/box.svg",
            shape: "./home/boxShape.svg",
        },
        otter: {
            img: "./home/otter.svg",
            shape: "./home/otterShape.svg",
        },
        pencil: {
            img: "./home/pencil.svg",
            shape: "./home/pencilShape.svg",
        },
        star: {
            img: "./home/star.svg",
            shape: "./home/starShape.svg",
        },
        surge: {
            img: "./home/surge.svg",
            shape: "./home/surgeShape.svg",
        },
        bundle: {
            img: "./home/bundle.svg",
            shape: "./home/bundleShape.svg",
        },
    };

    let world: World | undefined = undefined;
    let render: Render | undefined = undefined;
    let mouseCons: MouseConstraint | undefined = undefined;
    let engine: Engine | undefined = undefined;
    let initialized = $state(false);
    let mouseCollider: HTMLDivElement | undefined = $state();
    let rightBoundRect: Body | undefined = undefined;
    let botBoundRect: Body | undefined = undefined;

    function addShape(
        x: number,
        y: number,
        verts: Vector[][],
        texturePath: string,
        velX?: number,
        velY?: number,
    ) {
        if (!world) return;

        const b = Bodies.fromVertices(
            x,
            y,
            verts,
            {
                render: {
                    sprite: {
                        texture: texturePath,
                        xScale: 0.8,
                        yScale: 0.8,
                    },
                },
                density: 1.2,
                restitution: 0,
                frictionAir: 0.02,
            },
            true,
        );
        Body.set(b, "position", {
            x,
            y,
        });
        if (velX && velY) {
            Body.set(b, "velocity", { x: velX, y: velY });
        }
        Composite.add(world, b);
    }

    onMount(async () => {
        Common.setDecomp(PolyDecomp);
        // return;
        engine = Engine.create({
            gravity: { scale: 0.0018, x: 0, y: 1 },
            positionIterations: 8,
            velocityIterations: 6,
        });
        world = engine.world;

        const runner = Runner.create();

        Runner.run(runner, engine);

        // fetch svgs in js
        async function loadSvgs(url: string) {
            const text = await (await fetch(url)).text();
            return new DOMParser().parseFromString(text, "image/svg+xml");
        }

        function Svg2Vertices(d: Document) {
            const paths = d.querySelectorAll("path");

            const res: Vector[][] = [];
            for (const p of paths) {
                res.push(Svg.pathToVertices(p, 30));
            }
            return res;
        }

        // load vertex shapes of each shape
        await Promise.all(
            Object.values(svgs).map((item) =>
                loadSvgs(item.shape).then((d) => {
                    item.verticies = Svg2Vertices(d);
                }),
            ),
        );

        // pre-defined pile
        const rng = Math.random;
        const getXPos = () => {
            return rng() * 300 + width / 2 - 150;
        };
        addShape(getXPos(), -300, svgs.asterisk.verticies!, svgs.asterisk.img);
        addShape(width / 2, -450, svgs.otter.verticies!, svgs.otter.img);
        addShape(getXPos(), rng() * -200, svgs.box.verticies!, svgs.box.img);
        addShape(getXPos(), -300, svgs.surge.verticies!, svgs.surge.img);
        addShape(getXPos(), -80, svgs.bundle.verticies!, svgs.bundle.img);
        addShape(getXPos(), -80, svgs.bundle.verticies!, svgs.bundle.img);
        addShape(getXPos(), -300, svgs.pencil.verticies!, svgs.pencil.img);
        addShape(getXPos(), -300, svgs.pencil.verticies!, svgs.pencil.img);
        addShape(getXPos(), -200, svgs.arrow.verticies!, svgs.arrow.img);
        addShape(getXPos(), -200, svgs.arrow.verticies!, svgs.arrow.img);
        addShape(getXPos(), -300, svgs.star.verticies!, svgs.star.img);

        // world boundry

        rightBoundRect = Bodies.rectangle(width + 500, 10000, 1000, 20000, {
            isStatic: true,
            render: { visible: false },
        });
        botBoundRect = Bodies.rectangle(width / 2, height - 10, 10000, 10, {
            isStatic: true,
            render: { visible: false },
        });

        Composite.add(world, [
            Bodies.rectangle(0, 10000, 10, 20000, {
                isStatic: true,
                render: { visible: false },
            }),
            rightBoundRect,
            botBoundRect,
        ]);

        const pixelRatio = "devicePixelRatio" in window ? window.devicePixelRatio : 1;

        render = Render.create({
            element: container,
            engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
                pixelRatio,
            },
        });

        Render.run(render);

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height },
        });

        initialized = true;
    });

    $effect(() => {
        if (initialized && render && world && engine) {
            const pixelRatio = "devicePixelRatio" in window ? window.devicePixelRatio : 1;
            render.bounds.max.x = width * pixelRatio;
            render.bounds.max.y = height * pixelRatio;

            render.options.width = width ;
            render.options.height = height ;

            render.canvas.width = width  ;
            render.canvas.height = height ;

            const mouse = Mouse.create(mouseCollider!);
            mouse.pixelRatio = pixelRatio;
            // @ts-ignore
            mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
            // @ts-ignore
            mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
            // @ts-ignore
            mouse.element.removeEventListener("wheel", mouse.mousewheel);

            mouseCons = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    damping: 0.5,
                    render: {
                        visible: false,
                    },
                },
            });

            Composite.add(world, mouseCons);

            render.mouse = mouse;
        }

        return () => {
            if (mouseCons && world) {
                Composite.remove(world, mouseCons);
            }
        };
    });

    $effect(() => {
        if (width > 200 && rightBoundRect) {
            Body.set(rightBoundRect, "position", { x: width + 500, y: 10000 });
        }
    });

    const maxObjs = 15;
    let spawnedObjsCount = $state(0);

    let puffX = $state(0);
    let puffY = $state(0);

    function onmouseup({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
        if (mouseCons !== undefined && mouseCons.body !== null) {
            return;
        }
        if (spawnedObjsCount < maxObjs) {
            const randShape = Object.values(svgs).at(
                Math.floor(Math.random() * Object.keys(svgs).length),
            );
            if (!randShape) return;
            addShape(
                offsetX,
                offsetY,
                randShape.verticies!,
                randShape.img,
                Math.random() * 20 - 10,
                -Math.random() * 20,
            );
            spawnedObjsCount++;
        } else {
            puffX = offsetX;
            puffY = offsetY;
        }
    }

    function puff(node: HTMLElement, { duration }: { duration: number }) {
        return {
            duration,
            css: (t: number, u: number) => {
                const eased = cubicOut(t);

                return `
                transform: translate(-50%, -50%) scale(${1 + t * 0.5}) ;
                opacity: ${u * 0.4};
                `;
            },
        };
    }
</script>

<div
    class="mouseCollider"
    style="width:{width}px; height:{height}px; position:absolute; top:0; left:0; z-index:999;"
    bind:this={mouseCollider}
    onpointerup={(e) => {
        onmouseup(e);
    }}
>
    {#key [puffX, puffY]}
        <div class="puff" style="--x: {puffX}px; --y:{puffY}px;" in:puff={{ duration: 200 }}></div>
    {/key}
</div>

<div
    class="physicsContainer"
    bind:this={container}
    style="width:{width}px; height:{height}px; "
></div>

<style>
    @keyframes fadeout {
        from {
            transform: scale(1);
            opacity: 0.4;
        }

        to {
            transform: scale(1.5);
            opacity: 0;
        }
    }
    .puff {
        position: absolute;
        top: var(--y);
        left: var(--x);
        width: 4rem;
        height: 4rem;
        background-color: var(--black);
        border-radius: 100%;

        opacity: 0;
        pointer-events: none;
    }

    .physicsContainer {
        position: relative;
        z-index: 1;
        max-width: 100dvw;
    }
    :global(.physicsContainer > *) {
        max-width: 100%;
    }

    .mouseCollider {
        max-width: 100dvw;
    }
</style>
