<script lang="ts">
	import { sharedState } from "$lib/components/canvas/picker/shared_states.svelte";
	import { onMount } from "svelte";

	let { username = $bindable("Anon") }: { username: string } = $props();

	onMount(() => {
		if (
			localStorage.getItem("username") !== null &&
			(localStorage.getItem("username")?.length ?? 0) > 0
		) {
			username = localStorage.getItem("username") ?? "Anon";
		} else {
			username = Math.random() > 0.5 ? "Sparky" : "Stormy";
		}
	});

	$effect(() => {
		localStorage.setItem("username", username);
	});

	let isMobile = $derived(sharedState.isMobile);
</script>

<input
	class="username"
	type="text"
	bind:value={username}
	placeholder="username..."
	maxlength="15"
	class:isMobile
/>

<style>
	.username::placeholder {
		color: var(--grey);
	}

	.username {
		border-bottom: 1px solid var(--black);
		outline: 1px solid transparent;
		transition: outline-color 100ms ease-out;

		color: var(--black);
		font-size: 20px;
		line-height: 20px;
		font-weight: 500;

		max-width: 12rem;

		padding: 0.25rem;

		height: 2rem;
	}

	.username:hover {
		outline-color: var(--black);
	}

	@media (max-width: 610px) {
		.username {
			font-size: 16px;
			max-width: 8rem;
		}
	}
</style>
