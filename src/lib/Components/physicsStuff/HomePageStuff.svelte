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
		Vector
	} from 'matter-js';
	import { onMount } from 'svelte';

	let width = $state(500);
	let height = $state(500);
	let container = $state<HTMLDivElement>();
	let svgPaths: string[] = [
		'./home/arrow.svg',
		'./home/asterisk.svg',
		'./home/box.svg',
		'./home/bundle.svg',
		'./home/otter.svg',
		'./home/.svg',
		'./home/arrow.svg',
		'./home/pencil.svg'
	];

	Common.setDecomp(require('poly-decomp'));
	onMount(async () => {
		const engine = Engine.create();
		const world = engine.world;

		const render = Render.create({
			element: container,
			engine,
			options: {
				width,
				height
			}
		});

		Render.run(render);

		const runner = Runner.create();

		Runner.run(runner, engine);

		// fetch svgs in js
		async function loadSvgs(url: string) {
			const text = await (await fetch(url)).text();
			return new DOMParser().parseFromString(text, 'image/svg+xml');
		}

		function Svg2Vertices(d: Document) {
			const vertexSets = [];
			const paths = d.querySelectorAll('path');
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
			loadSvgs('./home/arrow.svg').then((d) => {
				arrow = Svg2Vertices(d);
			}),
			loadSvgs('./home/asterisk.svg').then((d) => {
				asterisk = Svg2Vertices(d);
			}),
			loadSvgs('./home/box.svg').then((d) => {
				box = Svg2Vertices(d);
			}),
			loadSvgs('./home/bundle.svg').then((d) => {
				bundle = Svg2Vertices(d);
			}),
			loadSvgs('./home/otter.svg').then((d) => {
				otter = Svg2Vertices(d);
			}),
			loadSvgs('./home/pencil.svg').then((d) => {
				pencil = Svg2Vertices(d);
			}),
			loadSvgs('./home/star.svg').then((d) => {
				star = Svg2Vertices(d);
			}),
			loadSvgs('./home/surge.svg').then((d) => {
				surge = Svg2Vertices(d);
			})
		];

        await Promise.all(loadingPromises); // 
	});
</script>

<div class="physicsContainer" bind:this={container}></div>

<style>
	/* CSS */
</style>
