<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<div id="content">
	{@render children()}
</div>
