<script lang="ts">

	import PenPicker from './PenPicker.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import UserNameInput from './UserNameInput.svelte';
	import { sharedState } from '$lib/components/canvas/picker/shared_states.svelte';
	import type { CanvasController, UserData } from '$lib/components/canvas/canvas_controller.svelte';
	
	let {
		userdata = $bindable(),
		canvasController = $bindable()
	}: { userdata: UserData; canvasController: CanvasController | undefined } = $props();

	let width = $state(0);
	$effect(() => {
		sharedState.isMobile = width < 900;
	});
</script>

<svelte:window bind:innerWidth={width} />

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
					button: ''
				}),
				(newColor) => {
					userdata.penInfo.color = newColor?.name ?? 'black';
				}
			}
		/>

		<div class="verDiv endDiv"></div>
	</div>
	{#if false}
		<!-- Plus button -->
		<button
			class="sizeBtn"
			onclick={() => {
				canvasController?.increaseZoom();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={1.5}
				stroke="currentColor"
				width="1.5rem"
				height="1.5rem"
			>
				<path
					stroke="#2b4061"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
				/>
			</svg>
		</button>

		<!-- Minus button -->
		<button
			class="sizeBtn"
			onclick={() => {
				canvasController?.decreaseZoom();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				width="1.5rem"
				height="1.5rem"
			>
				<path
					stroke="#2b4061"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
				/>
			</svg>
		</button>
		<div class="verDiv"></div>
	{/if}
	<div class="usernameHolder"><UserNameInput bind:username={userdata.username} /></div>
</div>

<style>
	.toolbar {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;

		z-index: 100;
		position: absolute;
		left: 50%;
		bottom: 5rem;
		transform: translate(-50%, 0);

		background-color: #edecec;
		padding: 0.75rem;


		border: 2px solid var(--grey);
		transition: border-color 300ms ease-out;

		justify-content: center;
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
