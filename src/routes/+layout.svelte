<script lang="ts">
	import ViewTransWrapper from '$lib/components/utils/ViewTransWrapper.svelte';


	import '../app.css';

	let { children } = $props();

	
</script>


<ViewTransWrapper>
	{@render children()}
</ViewTransWrapper>
