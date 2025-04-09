<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import type { Cursor } from '../CanvasController.svelte';
	import { BrushSvg, EraserSvg, MoveSvg, PenSvg } from '$lib/components/utils/svgs.svelte';

	let {
		username: _name,
		color,
		pos,
		instant = false,
		state
	}: Cursor & { instant?: boolean } = $props();
	let username = $derived(_name && _name.length > 0 ? _name : 'An Anonymous Otter');
	let smoothPos = new Spring(
		{
			x: pos.x,
			y: pos.y
		},
		instant
			? { stiffness: 0.4, damping: 0.9 }
			: {
					stiffness: 0.1,
					damping: 0.65
				}
	);

	function isLight(color: string) {
		const hex = color.replace('#', '');
		const c_r = parseInt(hex.substring(0, 0 + 2), 16);
		const c_g = parseInt(hex.substring(2, 2 + 2), 16);
		const c_b = parseInt(hex.substring(4, 4 + 2), 16);
		const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
		return brightness > 200;
	}

	const strokeColor = $derived(isLight(color) ? '#2B4061' : '#B3E8FF');
	const offsets = $derived<{ x: number; y: number } | undefined>(
		{
			pen: { x: -7, y: 0 },
			brush: { x: -1, y: 5 },
			eraser: { x: -15, y: 0 },
			move: { x: -13, y: 3 }
		}[state]
	);
	$effect(() => {
		smoothPos.target = { x: pos.x, y: pos.y };
	});
</script>

<div
	class="cursor"
	style="--x:{smoothPos.current.x}px; --y:{smoothPos.current
		.y}px; --fillColor:{color}; --strokeColor:{strokeColor}"
	transition:fade={{ duration: 400 }}
	class:rainbow={username?.toLowerCase() === 'surge'}
>
	<div class="cursorIcon" style="--offsetX: {offsets?.x}px; --offsetY:{offsets?.y}px">
		{#if state === 'pen'}
			{@render PenSvg(strokeColor, color)}
		{:else if state === 'brush'}
			{@render BrushSvg(strokeColor, color)}
		{:else if state === 'eraser'}
			{@render EraserSvg('#2B4061')}
		{:else if state === 'move'}
			{@render MoveSvg('#2B4061')}
		{/if}
	</div>

	<div class="nameLabel">
		{username}
	</div>
</div>

<style>
	.cursor {
		position: absolute;
		left: var(--x);
		top: var(--y);
	}

	.nameLabel {
		position: absolute;
		left: 2rem;
		top: -1rem;
		transform: translate(0, -50%);

		padding: 0.5rem 1rem;
		color: var(--strokeColor);
		background-color: var(--fillColor);
		border-radius: 2rem;
		border: black 2px solid;

		width: fit-content;
		text-wrap: nowrap;
	}

	.cursorIcon {
		position: absolute;
		left: 0;
		top: 0;

		width: 2rem;
		transform: translate(0, -100%) translate(var(--offsetX), var(--offsetY));
	}

	.rainbow {
		animation: spinning infinite linear 0.75s backwards;
	}
	.rainbow::before {
		animation: rainbowAni infinite linear 1s;
	}

	.rainbow::after {
		animation: rainbowAni infinite linear 1s;
	}

	@keyframes rainbowAni {
		0% {
			background-color: hsl(0, 100%, 70%);
			filter: hue-rotate(0deg);
		}

		100% {
			background-color: hsl(0, 100%, 70%);
			filter: hue-rotate(360deg);
		}
	}

	@keyframes spinning {
		0% {
			transform-origin: top left;
			transform: rotate();
		}

		100% {
			transform-origin: top left;
			transform: rotate(360deg);
		}
	}
</style>
