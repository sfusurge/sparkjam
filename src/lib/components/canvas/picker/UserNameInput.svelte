<script lang="ts">
	import { onMount } from 'svelte';
	import { sharedState } from './shared.svelte';

	let { username = $bindable('Anon') }: { username: string } = $props();

	onMount(() => {
		if (localStorage.getItem('username') !== null) {
			username = localStorage.getItem('username') ?? 'Anon';
		}
	});

	$effect(() => {
		localStorage.setItem('username', username);
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
		color: grey;
	}

	.username {
		border-bottom: 2px solid #2b4061;
		outline: 1px solid transparent;
		transition: outline-color 300ms ease-out;

		color: #2b4061;
		font-size: 20px;
		line-height: 20px;
		font-weight: 500;

		max-width: 12rem;

		padding: 0.25rem;

		height: 2rem;
	}

	.username:hover {
		outline-color: #2b4061;
	}

	@media (max-width: 610px) {
		.username {
			font-size: 16px;
			max-width: 8rem;
		}
	}
</style>
