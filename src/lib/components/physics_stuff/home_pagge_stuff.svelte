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
                frictionAir: 1,
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
        const engine = Engine.create();
        world = engine.world;

        const render = Render.create({
            element: container,
            engine,
            options: {
                width,
                height,
                background: "white",
                wireframes: false,
            },
        });

        Render.run(render);

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
        addShape(rng() * width, -300, svgs.asterisk.verticies!, svgs.asterisk.shape);
        addShape(220, -450, svgs.otter.verticies!, svgs.otter.shape);
        addShape(rng() * width, rng() * -200, svgs.box.verticies!, svgs.box.shape);
        addShape(rng() * width, -300, svgs.surge.verticies!, svgs.surge.shape);
        addShape(rng() * width, -80, svgs.bundle.verticies!, svgs.bundle.shape);
        addShape(rng() * width, -80, svgs.bundle.verticies!, svgs.bundle.shape);
        addShape( Math.random() * width, -300, svgs.pencil.verticies!, svgs.pencil.shape);
        addShape( Math.random() * width, -300, svgs.pencil.verticies!, svgs.pencil.shape);
        addShape( Math.random() * width, -200, svgs.arrow.verticies!, svgs.arrow.shape);
        addShape( Math.random() * width, -200, svgs.arrow.verticies!, svgs.arrow.shape);
        addShape( Math.random() * width, -300, svgs.star.verticies!, svgs.star.shape);


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

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseCons = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true,
                    strokeStyle:"grey"
                },
            },
        });

        Composite.add(world, mouseCons);

        render.mouse = mouse;

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height },
        });
    });
</script>

<div
    class="physicsContainer"
    bind:this={container}
    style="width:{width}px; height:{height}px;"
></div>
