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
	import { goto, pushState, replaceState } from "$app/navigation";
	import Dialog from "$lib/components/Dialog.svelte";
	import { page } from "$app/state";
	import { checkLobbyExist, createLobby } from "$lib/firebase/CanvasFirebaseController.ts";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	let {
		userdata = $bindable(),
		canvasController = $bindable(),
	}: { userdata: UserData; canvasController: CanvasController | undefined } = $props();

	let width = $state(0);
	let isMobile = $derived(sharedState.isMobile);
	let message = $state("");

	$effect(() => {
		sharedState.isMobile = width < 900;
	});

	function showMultiplayer() {
		pushState("", {
			showMultiplayer: true,
		});
	}

	async function CreateLobby() {
		const lobbyId = await createLobby();
		JoinLobby(lobbyId);
	}

	async function JoinLobby(lobbyId: string) {
		const exist = await checkLobbyExist(lobbyId);

		if (!exist) {
			alert("lobby does not exist");
		}

		if (canvasController) {
			canvasController.connectToLobby(lobbyId);
		}

		localStorage.setItem("lobbyid", lobbyId);
	}

	$effect(() => {
		if (message.length > 0) {
			setTimeout(() => {
				message = "";
			}, 1000);
		}
	});

	$effect(() => {
		if (page.url.searchParams.has("lobby") && canvasController !== undefined) {
			const id = page.url.searchParams.get("lobby");
			JoinLobby(id!);
		}
	});

	let lobbyIdInput = $state("");

	onMount(() => {
		if (localStorage.getItem("lobbyid")) {
			lobbyIdInput = localStorage.getItem("lobbyid") ?? "";
		}
	});
</script>

<svelte:window bind:innerWidth={width} />

<div class="multiplayerBtn">
	<GenericButton onclick={showMultiplayer} style="height:100%;" title="Multiplayer">
		<img src="/group.svg" alt="group icon" style="width: 2rem; margin:auto;" />
	</GenericButton>
</div>

<Dialog
	visible={page.state.showMultiplayer ?? false}
	onclose={() => {
		history.back();
	}}
	style="max-height: 400px; max-width:400px;"
>
	{#if canvasController?.lobbyId}
		<div class="ver">
			<label style="color: var(--grey);">Current Lobby:</label>
			<label style="font-size:30px">{canvasController.lobbyId}</label>

			<label
				class="inputField url"
				onpointerup={() => {
					navigator.clipboard.writeText(
						`https://sparkjam.design?lobby=${canvasController.lobbyId}`,
					);
					message = "Copied to clipboard!";
				}}>{`https://sparkjam.design?lobby=${canvasController.lobbyId}`}</label
			>
			{#if message.length > 0}
				<span transition:fade={{ duration: 100 }}>{message}</span>
			{/if}
			<div class="horDiv"></div>
			<GenericButton
				style="aspect-ratio:unset;padding:0.5rem;"
				onclick={() => {
					canvasController.leaveLobby();
				}}>Leave Lobby</GenericButton
			>
		</div>
	{:else}
		<div class="ver">
			<GenericButton
				style="aspect-ratio:unset;padding:0.5rem;"
				onclick={() => {
					CreateLobby();
				}}>Create a Lobby</GenericButton
			>

			<div class="horDiv"></div>

			<div class="hor">
				<input
					placeholder="123456"
					class="inputField"
					type="text"
					maxlength={6}
					bind:value={lobbyIdInput}
				/>
				<GenericButton
					style="aspect-ratio:unset; padding:0.5rem;"
					onclick={() => {
						JoinLobby(lobbyIdInput);
					}}>Join Lobby</GenericButton
				>
			</div>
		</div>
	{/if}
</Dialog>

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
	.url {
		cursor: pointer;
	}
	.horDiv {
		background-color: var(--lightGrey);
		width: 100%;
		height: 2px;
		padding: 0rem 2rem;
	}

	.hor {
		display: flex;
		gap: 0.5rem;
	}

	.inputField {
		padding: 0.25rem;
		border: 1px var(--black) solid;
		outline: none;
		text-align: right;
	}

	.inputField:focus {
		outline: none;
	}

	.ver {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-end;
	}
	.multiplayerBtn {
		position: absolute;
		right: 4rem;
		bottom: 5rem;
		height: 3rem;
	}

	.panBtn {
		position: absolute;
		left: 4rem;
		bottom: 5rem;
		height: 3rem;

		@media screen and (max-width: 768px) {
			top: 2rem;
			height: 2.5rem;
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
