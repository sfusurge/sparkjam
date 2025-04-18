<script lang="ts" module>
	import { onMount } from 'svelte';
	import Picker from './Picker.svelte';

	export interface PenData {
		size: number;
		layer: number;
		name: string;
		smooth: boolean;
		button?: string;
		// boolean indicates if the pen is selected.
	}
</script>

<script lang="ts">
	import { PenSvg, BrushSvg, EraserSvg, MoveSvg } from '$lib/components/utils/svgs.svelte';
	import { sharedState } from '$lib/components/canvas/picker/shared_states.svelte';

	interface PenPickerProps {
		selectedPen: PenData | undefined;
	}

	const pens: PenData[] = [
		{
			name: 'move',
			button: 'v',
			layer: -1,
			size: -1,
			smooth: false
		},
		{
			name: 'pen',
			button: 'p',
			layer: 1,
			size: 10,
			smooth: true
		},
		{
			name: 'brush',
			button: 'b',
			layer: 0,
			size: 40,
			smooth: false
		},
		{
			name: 'eraser',
			button: 'e',
			layer: -1,
			size: -1,
			smooth: false
		}
	];

	let isMobile = $derived(sharedState.isMobile);

	let { selectedPen = $bindable() }: PenPickerProps = $props();
	let namedPens = $derived(pens.map((p) => ({ name: p.name, button: p.button, data: p })));
	onMount(() => {
		selectedPen = pens[1];
	});
</script>
{#snippet Pen(pen: PenData, selected: boolean)}
	{@const strokeColor = selected ? 'var(--lightGrey)' : 'var(--black)'}

	<div class="penBtn" class:selected>
		{#if pen.button && !isMobile}
			<label class="btnLabel">{pen.button.toUpperCase()}</label>
		{/if}

		<div class="icon">
			{#if pen.name === 'pen'}
				{@render PenSvg(strokeColor, 'transparent')}
			{:else if pen.name === 'brush'}
				{@render BrushSvg(strokeColor, 'transparent')}
			{:else if pen.name === 'eraser'}
				{@render EraserSvg(strokeColor)}
			{:else if pen.name === 'move'}
				{@render MoveSvg(strokeColor)}
			{/if}
		</div>
	</div>
{/snippet}

<Picker
	bind:selectedItem={
		() => (selectedPen ? { name: selectedPen.name, data: selectedPen } : undefined),
		(newPen) => {
			selectedPen = newPen?.data;
		}
	}
	items={namedPens}
	snippet={Pen}
/>

<style>
	.icon {
		width: 1.25rem;
		position: relative;
	}

	.penBtn {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		box-sizing: border-box;

		min-width: 2rem;
		height: 2rem;

	
		background-color: transparent;
		border: 1px solid transparent;
		transition:
		border-color 100ms ease-out,
			background-color 100ms ease-out;
	}



	.penBtn:not(.selected):hover {
		border-color: var(--black);
	}

	.penBtn.selected {
		border-color: var(--black);
		background-color: var(--black);
	}

	.btnLabel {
		color: var(--black);
		position: absolute;
		top: 0.15rem;
		left: 0.15rem;
		font-size: 10px;
		line-height: 9px;
	}

	.penBtn.selected > .btnLabel {
		color: var(--white);
	}
</style>
