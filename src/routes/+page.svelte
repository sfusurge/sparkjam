<script lang="ts">
	import { transitionType } from '$lib/Components/utils/ViewTransitionSlideWrapper.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<a
	href="canvas"
	onclick={() => {
		transitionType.direction = 'left';
	}}>Canvas</a
>

<a
	href="game"
	onclick={() => {
		transitionType.direction = 'up';
	}}>Game</a
>

<div class="tester">BALH BLAH
</div>

<style>
    .tester {
        position: absolute;
        right: 0;
        border: blue 6px solid;
    }
    a {
        border: 2px solid coral;
        padding: 1rem;
        box-sizing: border-box;
    }
</style>