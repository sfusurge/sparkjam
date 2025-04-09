<script lang="ts">
	// import ViewTransitionSlideWrapper from '$lib/components/utils/ViewTransitionSlideWrapper.svelte';
	import '../app.css';

	let { children } = $props();

	
</script>

<!-- <ViewTransitionSlideWrapper> -->
	{@render children()}
<!-- </ViewTransitionSlideWrapper> -->
