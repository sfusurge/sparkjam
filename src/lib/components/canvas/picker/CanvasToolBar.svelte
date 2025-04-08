<script lang="ts">
	import { onMount } from 'svelte';
	import type { UserData } from '../CanvasController.svelte';
	import PenPicker from './PenPicker.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import UserNameInput from './UserNameInput.svelte';

	let { userdata = $bindable() }: { userdata: UserData } = $props();

    let width = $state(0)
	let isMobile = $derived(width < 900 && navigator.maxTouchPoints > 1);


</script>
<svelte:window bind:innerWidth={width}/>

<div class="toolbar">
	{#if !isMobile}
		<!-- TODO: show zoom btns here -->

		<div class="verDiv"></div>
	{/if}

	<PenPicker bind:selectedPen={userdata.penInfo} showHotkey={!isMobile} />
	<div class="verDiv"></div>

	<ColorPicker
		showHotkey={!isMobile}
		bind:selectedColor={
			() => ({
				dark: false,
				name: userdata.penInfo.color,
				button: ''
			}),
			(newColor) => {
				userdata.penInfo.color = newColor?.name ?? 'black';
			}
		}
	/>
    <div class="verDiv"></div>
    <UserNameInput bind:username={userdata.username}/>
</div>

<style>
	.toolbar {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;

		position: absolute;
		left: 50%;
		bottom: 5rem;
		transform: translate(-50%, 0);
	}

	.verDiv {
		width: 1px;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		background-color: #8cc8e1;
	}
</style>
