<script lang="ts">
	import {
		Engine,
		Render,
		Runner,
		Common,
		Composite,
		Vertices,
		Svg,
		Bodies,
		Vector,
		Mouse,
		MouseConstraint,
		Body,
	} from "matter-js";
	import { onMount } from "svelte";
	import "./pathseg.js";
	import PolyDecomp from "poly-decomp";

	let width = $state(500);
	let height = $state(500);
	let container = $state<HTMLDivElement>();
	let svgPaths: string[] = [
		"./home/arrow.svg",
		"./home/asterisk.svg",
		"./home/box.svg",
		"./home/bundle.svg",
		"./home/otter.svg",
		"./home/.svg",
		"./home/arrow.svg",
		"./home/pencil.svg",
	];

	onMount(async () => {
		Common.setDecomp(PolyDecomp);
		// return;
		const engine = Engine.create();
		const world = engine.world;

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

		let arrow: Vector[][] | undefined = undefined;
		let asterisk: Vector[][] | undefined = undefined;
		let box: Vector[][] | undefined = undefined;
		let bundle: Vector[][] | undefined = undefined;
		let otter: Vector[][] | undefined = undefined;
		let pencil: Vector[][] | undefined = undefined;
		let star: Vector[][] | undefined = undefined;
		let surge: Vector[][] | undefined = undefined;

		const loadingPromises: Promise<void>[] = [
			loadSvgs("./home/arrowShape.svg").then((d) => {
				arrow = Svg2Vertices(d);
			}),
			loadSvgs("./home/asterisk.svg").then((d) => {
				asterisk = Svg2Vertices(d);
			}),
			loadSvgs("./home/boxShape.svg").then((d) => {
				box = Svg2Vertices(d);
			}),
			loadSvgs("./home/bundleShape.svg").then((d) => {
				bundle = Svg2Vertices(d);
			}),
			loadSvgs("./home/otterShape.svg").then((d) => {
				otter = Svg2Vertices(d);
			}),
			loadSvgs("./home/pencilShape.svg").then((d) => {
				pencil = Svg2Vertices(d);
			}),
			loadSvgs("./home/starShape.svg").then((d) => {
				star = Svg2Vertices(d);
			}),
			loadSvgs("./home/surgeShape.svg").then((d) => {
				surge = Svg2Vertices(d);
			}),
		];

		await Promise.all(loadingPromises); //

		Composite.add(
			world,
			Bodies.fromVertices(
				Math.random() * width,
				-300,
				asterisk!,
				{
					render: {
						strokeStyle: "#B3E8FF",
						lineWidth: 1,
						fillStyle: "#B3E8FF",
					},
					label: "Asterisk",
				},
				true,
			),
		);

		Composite.add(
			world,
			Bodies.fromVertices(
				220,
				-450,
				otter!,
				{
					render: {
						sprite: {
							texture: "./home/otter.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "Otter",
				},
				true,
			),
		);
		const boxBody = Bodies.fromVertices(
			-0,
			0,
			box!,
			{
				render: {
					sprite: {
						texture: "./home/box.svg",
						xScale: 0.8,
						yScale: 0.8,
					},
				},
				label: "Box",
			},
			true,
		);
		Body.set(boxBody, "position", { x: Math.random() * width, y: Math.random() *-200 });
		Composite.add(world, boxBody);

		Composite.add(
			world,
			Bodies.fromVertices(
				Math.random() * width,
				-300,
				surge!,
				{
					render: {
						sprite: {
							texture: "./home/surge.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "Surge",
				},
				true,
			),
		);
				const b = Bodies.fromVertices(
				Math.random( ) * 500,
				-300,
				bundle!,
				{
					render: {
						sprite: {
							texture: "./home/bundle.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "bundle",
				},
				true,
			);

		Body.set(b, "position", { x: Math.random() * width, y: Math.random() *-80 });

		Composite.add(
			world,
			b,
		);

		const p1 = Bodies.fromVertices(
			Math.random() * width,
			-300,
			pencil!,
			{
				render: {
					sprite: {
						texture: "./home/pencil.svg",
						xScale: 0.8,
						yScale: 0.8,
					},
				},
				label: "pencil2",
			},
			true,
		);

		Body.set(p1, "position", { x: Math.random() * width, y:  Math.random() * -200 });
		Composite.add(world, p1);
		const p2 = Bodies.fromVertices(
			Math.random() * width,
			-300,
			pencil!,
			{
				render: {
					sprite: {
						texture: "./home/pencil.svg",
						xScale: 0.8,
						yScale: 0.8,
					},
				},
				label: "pencil2",
			},
			true,
		);

		Body.set(p2, "position", { x: Math.random() * width, y:  Math.random() * -200 });
		Composite.add(world, p2);

		Composite.add(
			world,
			Bodies.fromVertices(
				Math.random() * width,
				Math.random() *-300,
				arrow!,
				{
					render: {
						sprite: {
							texture: "./home/arrow.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "arrow2",
				},
				true,
			),
		);

		Composite.add(
			world,
			Bodies.fromVertices(
				Math.random() * width,
				Math.random() *-300,
				arrow!,
				{
					render: {
						sprite: {
							texture: "./home/arrow.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "arrow1",
				},
				true,
			),
		);


		const s = Bodies.fromVertices(
				Math.random() * width,
				-300,
				star!,
				{
					render: {
						sprite: {
							texture: "./home/star.svg",
							xScale: 0.8,
							yScale: 0.8,
						},
					},
					label: "star",
				},
				true,
			);

		Body.set(s, "position", { x: Math.random() * width, y: -100 });

		Composite.add(
			world,
			s,
		);

		// world boundry
		Composite.add(world, [
			Bodies.rectangle(width, 10000, 10, 20000, {
				isStatic: true,
				render: { visible: false },
			}),

			Bodies.rectangle(0, 10000, 10, 20000, { isStatic: true, render: { visible: false } }),
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

<style>

</style>
