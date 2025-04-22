<script lang="ts">
	import PenPicker from "./PenPicker.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import UserNameInput from "./UserNameInput.svelte";
	import { sharedState } from "$lib/components/canvas/picker/shared_states.svelte";
	import type {
		CanvasController,
		UserData,
	} from "$lib/components/canvas/canvas_controller.svelte";
	import GenericButton from "$lib/components/canvas/picker/GenericButton.svelte";

	let {
		userdata = $bindable(),
		canvasController = $bindable(),
	}: { userdata: UserData; canvasController: CanvasController | undefined } = $props();

	let width = $state(0);
	let isMobile = $derived(sharedState.isMobile);

	$effect(() => {
		sharedState.isMobile = width < 900;
	});
</script>

<svelte:window bind:innerWidth={width} />

<div class="panBtn">
	<GenericButton
		onclick={() => {
			canvasController!.disablePan = !canvasController?.disablePan;
		}}
		style="height:100%;"
	>
		{#if canvasController?.disablePan}
			<img src="/noMoveArrow.svg" alt="pan disabled" class="icon" />
		{:else}
			<img src="/home/otter.svg" class="icon" />
		{/if}
	</GenericButton>
</div>

<div class="toolbar">
	<div class="toolHolder">
		<PenPicker
			bind:selectedPen={
				() => {
					return userdata.penInfo;
				},
				(newPen) => {
					userdata.penInfo = { ...newPen, color: userdata.penInfo.color };
				}
			}
		/>
		<div class="verDiv"></div>

		<ColorPicker
			bind:selectedColor={
				() => ({
					dark: false,
					name: userdata.penInfo.color,
					button: "",
				}),
				(newColor) => {
					userdata.penInfo.color = newColor?.name ?? "black";
				}
			}
		/>

		<div class="verDiv endDiv"></div>
	</div>

	{#if !isMobile}
		<div class="usernameHolder"><UserNameInput bind:username={userdata.username} /></div>
	{/if}
</div>

{#if isMobile}
	<div class="mobileNameHolder"><UserNameInput bind:username={userdata.username} /></div>
{/if}

<style>

	

	.panBtn {
		position: absolute;
		left: 5rem;
		bottom: 5rem;
		height:3rem;

		@media screen and (max-width: 768px){
			top: 2rem;
			height:2.5rem;
		}
	}
	.icon {
		height: 100%;
		width: auto;
	}

	.mobileNameHolder {
		position: absolute;
		top: 2rem;
		left: 50%;
		transform: translate(-50%, 0);

		background-color: var(--white);
		padding: 0.25rem 1rem;
		border: 1px solid var(--black);
	}

	.toolbar {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;

		z-index: 100;
		position: absolute;
		left: 50%;
		bottom: 5rem;
		transform: translate(-50%, 0);

		background-color: var(--white);
		padding: 0.75rem;

		border: 1px solid var(--grey);
		transition: border-color 300ms ease-out;

		justify-content: center;

		height: 3.5rem;
	}

	.toolbar:hover {
		border-color: var(--black);
	}

	.verDiv {
		width: 0px;
		margin: 0.5rem;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		border-right: 1px solid var(--grey);
	}

	.sizeBtn {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		box-sizing: border-box;

		min-width: 2rem;
		height: 2rem;

		border-radius: 5px;

		background-color: transparent;

		transition:
			filter 300ms ease-out,
			background-color 300ms ease-out;
	}

	.sizeBtn:hover {
		background-color: #b3e8ff;
		filter: brightness(1.1);
	}

	.sizeBtn:active {
		filter: brightness(0.95);
	}

	.toolHolder {
		display: flex;
		flex-direction: row;
	}

	@media (max-width: 480px) {
		.toolbar {
			flex-flow: wrap;
		}
		.usernameHolder {
			flex: 1;
			display: flex;
			justify-content: center;
		}

		.endDiv {
			display: none;
		}
	}

	@media (max-width: 380px) {
		.verDiv {
			margin: 0.1rem;
		}

		.toolbar {
			padding: 0;
			border: none;
		}
	}
</style>
