<script lang="ts">
    import {
        Engine,
        Render,
        Runner,
        Common,
        Composite,
        Svg,
        Bodies,
        Vector,
        Mouse,
        MouseConstraint,
        Body,
        World,
    } from "matter-js";
    import { onMount } from "svelte";
    import "./pathseg.js";
    // @ts-ignore
    import PolyDecomp from "poly-decomp";

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

    function addShape(x: number, y: number, verts: Vector[][], texturePath: string) {
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
        Composite.add(world, [
            Bodies.rectangle(width, 10000, 10, 20000, {
                isStatic: true,
                render: { visible: false },
            }),

            Bodies.rectangle(0, 10000, 10, 20000, {
                isStatic: true,
                render: { visible: false },
            }),
            Bodies.rectangle(width / 2, height - 10, width, 10, {
                isStatic: true,
                render: { visible: false },
            }),
        ]);

        render = Render.create({
            element: container,
            engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
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
            render.bounds.max.x = width;
            render.bounds.max.y = height;

            render.options.width = width;
            render.options.height = height;

            render.canvas.width = width;
            render.canvas.height = height;

            const mouse = Mouse.create(render.canvas);
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
</script>

<div
    class="physicsContainer"
    bind:this={container}
    style="width:{width}px; height:{height}px;"
></div>
