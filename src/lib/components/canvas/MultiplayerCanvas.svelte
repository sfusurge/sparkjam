<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import UserCursor from "./Cursor/UserCursor.svelte";
	import {
		CanvasController,
		type UserData,
	} from "$lib/components/canvas/canvas_controller.svelte";

	interface CanvasProps {
		size?: { width: number; height: number };
		style?: string;
		userdata?: UserData;
		maxLayers: number; // the highest layer that the pen options can provide
		canvasController?: CanvasController | undefined;
	}

	let {
		size,
		style,
		userdata,
		maxLayers,
		canvasController = $bindable(),
	}: CanvasProps = $props();

	let staticCanvas: HTMLCanvasElement | undefined = $state();
	let dynamicCanvas: HTMLCanvasElement | undefined = $state();

	let pixelRatio = $state(1);
	
	$effect(() => {
		if (staticCanvas && dynamicCanvas && maxLayers > 0) {
			canvasController = new CanvasController(staticCanvas, dynamicCanvas, maxLayers);
			if ("devicePixelRatio" in window) {
				pixelRatio = window.devicePixelRatio;
			}
		}
	});


	$effect(() => {	
		// basically react lmao
		userdata?.penInfo, userdata?.username;
		if (userdata && canvasController ) {
			canvasController.userdata = userdata;
		}
	});

	onDestroy(() => {
		if (canvasController) {
			canvasController.cleanup();
		}
	});

	let container: HTMLDivElement | undefined = $state();

	$effect(() => {
		if (container) {
			container.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
			});
		}
	});

	onMount(() => {
		if ("devicePixelRatio" in window) {
			function listenOnDevicePixelRatio() {
				function onChange() {
					pixelRatio = window.devicePixelRatio;
					listenOnDevicePixelRatio();
				}
				matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener(
					"change",
					onChange,
					{ once: true },
				);
			}
			listenOnDevicePixelRatio();
		}
	});
</script>

<div
	bind:this={container}
	class="canvasContainer"
	style={`${style ?? ""} ${size ? `width: ${size.width}px; height: ${size.height}px;` : ""}`}
>
	<canvas
		bind:this={staticCanvas}
		class="staticCanvas"
		width="{size?.width! * pixelRatio}px"
		height={size?.height! * pixelRatio}
	></canvas>

	<canvas
		bind:this={dynamicCanvas}
		class="dynamicCanvas"
		width="{size?.width! * pixelRatio}px"
		height={size?.height! * pixelRatio}
		tabindex="1"
	></canvas>

	<div class="cursorContainer">
		{#if canvasController}
			{#each Object.values(canvasController.othersCursors) as cursor, _ (cursor.id)}
				<UserCursor {...cursor} />
			{/each}
		{/if}
		{#if canvasController?.selfCursor}
			<UserCursor {...canvasController.selfCursor} instant />
		{/if}
	</div>

	<div class="positionLabel">
		{canvasController?.location.x}, {canvasController?.location.y}
	</div>
</div>

<style>
	.canvasContainer {
		position: relative;
		cursor: none;
		overflow: hidden;
		background-color: #edecec;
	}

	.positionLabel {
		position: absolute;
		
		bottom: 2rem;
		left: 50%;
		transform: translate(-50%, 0);

		font-size: 16px;
		color: rgb(154, 154, 154);
	}

	.staticCanvas,
	.dynamicCanvas,
	.cursorContainer {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.staticCanvas {
		background-color: #edecec;
	}

	.cursorContainer {
		pointer-events: none;
	}
</style>
