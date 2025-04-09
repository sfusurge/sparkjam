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

	interface PenPickerProps {
		selectedPen: PenData | undefined;
		showHotkey?: boolean;
	}

	const pens: PenData[] = [
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
		},
		{
			name: 'move',
			button: 'v',
			layer: -1,
			size: -1,
			smooth: false
		}
	];
	let { selectedPen = $bindable(), showHotkey = false }: PenPickerProps = $props();
	let namedPens = $derived(pens.map((p) => ({ name: p.name, button: p.button, data: p })));
	onMount(() => {
		selectedPen = pens[0];
	});
</script>

{#snippet Pen(pen: PenData, selected: boolean)}
	{@const strokeColor = selected ? '#B3E8FF' : '#2B4061'}

	<div class="penBtn" class:selected>
		{#if pen.button && showHotkey}
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
.icon{
	width:1.25rem;
	position:relative;
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

		border-radius: 5px;

		background-color: transparent;

		transition:
			filter 300ms ease-out,
			background-color 300ms ease-out;
	}

	.penBtn:hover {
		filter: brightness(1.1);
	}

	.penBtn:not(.selected):hover {
		background-color: #b3e8ff;
	}

	.penBtn.selected {
		background-color: #2b4061;
	}

	.btnLabel {
		color: #2b4061;
		position: absolute;
		top: 0.15rem;
		left: 0.15rem;
		font-size: 10px;
		line-height: 9px;
	}

	.penBtn.selected > .btnLabel {
		color: #b3e8ff;
	}
</style>
