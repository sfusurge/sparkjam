<script lang="ts" generics="T">
	import { onDestroy, onMount, type Snippet } from 'svelte';

	export interface PickerProp<T> {
		items: {
			name: string; // also used as backup display, must be unique
			data: T; // internal representation
			button?: string;
		}[];
		selectedItem?: { name: string; data: T } | undefined; // internal rep of the currently selected item
		snippet?: Snippet<[T, boolean]>;
	}

	let { items, snippet, selectedItem = $bindable() }: PickerProp<T> = $props();

	const keyToData = $derived.by(() => {
		const map = new Map<string, { name: string; data: T }>();

		for (const item of items) {
			if (item.button) {
				map.set(item.button, { name: item.name, data: item.data });
			}
		}

		return map;
	});

	function onkey(e: KeyboardEvent) {
		if ((e.target as HTMLElement)?.tagName !== 'INPUT') {
			const data = keyToData.get(e.key);
			if (data) {
				selectedItem = {
					name: data.name,
					data: data.data
				};
			}
		}
	}

	onMount(() => {
		window.addEventListener('keypress', onkey);
	});
	onDestroy(() => {
		window.removeEventListener('keypress', onkey);
	});
</script>

<div class="pickerContainer">
	{#each items as item (item.name)}
		<button
			class="pickerItem"
			onclick={() => {
				if (selectedItem?.name == item.name) {
					selectedItem = undefined; // empty as default value
				} else {
					selectedItem = {
						data: item.data,
						name: item.name
					};
				}
			}}
			title={item.name}
			name={item.name}
		>
			{#if snippet}
				{@render snippet(item.data, item.name == selectedItem?.name)}
			{:else}
				<span>{item.name}</span>
			{/if}
            
		</button>
	{/each}
</div>

<style>
	.pickerContainer {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.pickerItem {
		/* place holder */
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>
