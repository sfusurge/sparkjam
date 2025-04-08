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
	interface PenPickerProps {
		selectedPen: PenData | undefined;
		showHotkey?: boolean;
	}

	const pens: PenData[] = [
		{
			name: 'pen',
			button: 'q',
			layer: 1,
			size: 10,
			smooth: true
		},
		{
			name: 'brush',
			button: 'w',
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
			button: 'r',
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

		{#if pen.name === 'pen'}
			<svg width="15" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M6.922 4.129L8.567 1.34C10.313.41 14 1.34 14 4.686l-1.552 2.662m-5.526-3.22L1 14.168 2.164 19l4.463-1.673 5.82-9.98M6.923 4.13l5.526 3.219"
					stroke={strokeColor}
					stroke-width="1.5"
				/></svg
			>
		{:else if pen.name === 'brush'}
			<svg width="15" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M6.922 4.129L8.567 1.34C10.313.41 14 1.34 14 4.686l-1.552 2.662m-5.526-3.22L1 14.168 2.164 19l4.463-1.673 5.82-9.98M6.923 4.13l5.526 3.219"
					stroke={strokeColor}
					stroke-width="1.5"
				/></svg
			>
		{:else if pen.name === 'eraser'}
			<svg width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"
				><mask id="prefix__a" fill="#fff"
					><path
						d="M6.644 1.694a2 2 0 012.758-.631l5.11 3.206a2 2 0 01.632 2.757l-4.29 6.839-2.355 3.753L0 12.286l2.317-3.693 4.327-6.899z"
					/></mask
				><path
					d="M1.923 9.231l8.537 5.272.788-1.276L2.71 7.955l-.788 1.276zm6.576 8.387l-.797 1.27 1.27.798.798-1.27-1.27-.798zM0 12.286l-1.27-.797-.798 1.271 1.27.797.798-1.27zm8.604-9.953l5.111 3.206L15.31 3 10.2-.209 8.604 2.333zm.692 14.014L.797 11.016l-1.594 2.541 8.5 5.332 1.593-2.542zm-8.025-3.264L3.588 9.39 1.046 7.796l-2.317 3.693 2.542 1.595zM3.588 9.39l4.327-6.899L5.374.897 1.046 7.796 3.588 9.39zM13.873 6.23l-4.29 6.839 2.541 1.594 4.29-6.84-2.54-1.593zm-4.29 6.839L7.229 16.82l2.54 1.594 2.355-3.753-2.541-1.594zm4.132-7.529a.5.5 0 01.158.69l2.541 1.594a3.5 3.5 0 00-1.105-4.825L13.715 5.54zM10.2-.208A3.5 3.5 0 005.374.897l2.541 1.594a.5.5 0 01.69-.158l1.594-2.54z"
					fill={strokeColor}
					mask="url(#prefix__a)"
				/></svg
			>
		{:else if pen.name === 'move'}
			<p>TODO</p>
		{/if}
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
