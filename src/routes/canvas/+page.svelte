<script lang="ts">
	import type { CanvasController, UserData } from '$lib/Components/canvas/CanvasLogics.svelte.ts';
	import MultiplayerCanvas from '$lib/Components/canvas/MultiplayerCanvas.svelte';
	import CanvasToolBar from '$lib/Components/canvas/picker/CanvasToolBar.svelte';


	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let userdata: UserData = $state({
		username: '',
		penInfo: {
			color: '',
			layer: -1,
			name: '',
			size: -1,
			smooth: false
		}
	});

	let canvasController = $state<CanvasController | undefined>();
	let innerWidth = $state(0);
	let innerHeight = $state(0);

	function onResize() {
		innerWidth = Math.floor(document.documentElement.clientWidth - 1);
		innerHeight = Math.floor(document.documentElement.clientHeight - 1);
	}
	onMount(() => {
		window.addEventListener('resize', onResize);
		onResize();
	});

	onDestroy(() => {
		window.removeEventListener('resize', onResize);
	});
</script>

<CanvasToolBar bind:userdata bind:canvasController />

{#if innerWidth > 0}
	<div
		in:fade={{
			duration: 500
		}}
	>
		<MultiplayerCanvas
			maxLayers={2}
			size={{ height: innerHeight, width: innerWidth }}
			{userdata}
			bind:canvasController
		/>
	</div>
{/if}

<style>
</style>
