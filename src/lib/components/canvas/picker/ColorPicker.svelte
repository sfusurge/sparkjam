<script lang="ts" module>
	import { onMount } from "svelte";
	import Picker from "./Picker.svelte";
	import { sharedState } from "$lib/components/canvas/picker/shared_states.svelte";

	export interface ColorData {
		name: string;
		dark: boolean; // is this a "dark" color?
		button?: string;
		// boolean indicates if the pen is selected.
	}
</script>

<script lang="ts">
	interface ColorPickerProps {
		selectedColor: ColorData | undefined;
	}

	const colors: ColorData[] = [
		{
			name: "#F16969",
			dark: false,
			button: "1",
		},
		{
			name: "#FDC380",
			dark: false,
			button: "2",
		},
		{
			name: "#9AE369",
			dark: false,
			button: "3",
		},
		{
			name: "#8CC8E1",
			dark: false,
			button: "4",
		},
		{
			name: "#242424",
			dark: true,
			button: "5",
		},
	];

	let isMobile = $derived(sharedState.isMobile);

	let { selectedColor = $bindable() }: ColorPickerProps = $props();
	let namedColors = $derived(colors.map((p) => ({ name: p.name, button: p.button, data: p })));

	onMount(() => {
		selectedColor = colors.at(-1);
	});
</script>

{#snippet ColorCircle(color: ColorData, selected: boolean)}
	<div class="colorCircle" class:selected class:dark={color.dark} style="--color:{color.name}">
		{#if !isMobile}
			<label class="btnLabel">{color.button}</label>
		{/if}
	</div>
{/snippet}

<Picker
	bind:selectedItem={
		() => (selectedColor ? { name: selectedColor.name, data: selectedColor } : undefined),
		(newColor) => {
			selectedColor = newColor?.data;
		}
	}
	items={namedColors}
	snippet={ColorCircle}
	style="margin-right:0.25rem;"
></Picker>

<style>
	.colorCircle {
		width: 2rem;
		height: 2rem;
		position: relative;

		transition: filter 300ms ease-out;
	}

	.colorCircle:hover {
		filter: brightness(1.15);
	}

	.colorCircle::before {
		content: "";
		border: 3px solid var(--black);
		border-radius: 50%;
		box-sizing: border-box;

		position: absolute;
		left: 1.25rem;
		top: 50%;
		transform: translate(-50%, -50%);

		width: 1.5rem;
		height: 1.5rem;
		background-color: var(--color);
	}

	.colorCircle::after {
		content: "";
		position: absolute;
		position: absolute;
		left: 1.25rem;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;

		background-color: transparent;
		transition: background-color 300ms ease-out;
	}
	.colorCircle.selected::after {
		background-color: var(--black);
	}

	.colorCircle.dark.selected::after {
		background-color: var(--white);
	}

	.btnLabel {
		color: var(--grey);
		position: absolute;
		top: 0.1rem;
		left: 0.2rem;
		font-size: 10px;
		line-height: 9px;
	}
</style>
