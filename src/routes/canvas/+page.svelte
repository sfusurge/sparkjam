<script lang="ts">
	import type { UserData } from '$lib/components/canvas/CanvasController.svelte';
	import MultiplayerCanvas from '$lib/components/canvas/MultiplayerCanvas.svelte';
	import CanvasToolBar from '$lib/components/canvas/picker/CanvasToolBar.svelte';

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
</script>

<CanvasToolBar bind:userdata />

<MultiplayerCanvas maxLayers={2} size={{ height: 500, width: 500 }} {userdata} />

<style>
</style>
