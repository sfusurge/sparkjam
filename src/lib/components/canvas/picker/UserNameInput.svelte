<script lang="ts">
	import { onMount } from 'svelte';

	let { username = $bindable('Anon') }: { username: string } = $props();

	onMount(() => {
		if (localStorage.getItem('username') !== null) {
			username = localStorage.getItem('username') ?? 'Anon';
		}
	});

	$effect(() => {
		localStorage.setItem('username', username);
	});
</script>

<input class="username" type="text" bind:value={username} placeholder="username..." maxlength="15" />

<style>
	.username::placeholder {
		color: lightgrey;
	}

	.username {
		border-bottom: 2px solid #2b4061;
		outline: 1px solid transparent;
		transition: outline-color 300ms ease-out;

        color: #2B4061;
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
</style>
