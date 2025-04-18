<script lang="ts">
	import Accordian from "$lib/components/Accordian/Accordian.svelte";
	import HoverGrid from "$lib/components/HoverGrid.svelte";
	import HomePageStuff from "$lib/components/physics_stuff/home_pagge_stuff.svelte";
	import RainbowButton from "$lib/components/RainbowButton.svelte";
	import StuffHoverGrid from "$lib/components/StuffHoverGrid.svelte";
	import TopBar from "$lib/components/TopBar.svelte";
    import Typography from "$lib/components/Typography.svelte";

	let _width = $state(0);
	let width = $derived(Math.min(_width, 1920));
	let height = $state(0);
	let titleHeight = $derived(Math.max(Math.min(height * 0.65, 1200), 600));
</script>

<svelte:window bind:innerWidth={_width} bind:innerHeight={height} />

<TopBar
	items={[
		{
			label: "SCHEDULE",
			target: "",
		},
		{
			label: "FILM SERIES",
			target: "",
		},
		{
			label: "FAQ",
			target: "",
		},
		{
			label: "JUDGES",
			target: "",
		},
	]}
/>

<div class="title" draggable="false">
	<div class="imgHolder">
		<img src="./title.svg" alt="SparkJam" width="1198" height="228" />
		<div class="mask"></div>
	</div>

	<span>Applications Will Open<br /><strong>Friday, April 18th</strong></span>

	<RainbowButton>
		<a
			href="webcal://sparkjam_application_opens.ics"
			target="_blank"
			rel="noopener noreferrer"
			title="Save Event in Google Calendar">SET A REMINDER</a
		>
	</RainbowButton>

	<p class="dateText"><strong>( MAY 17 - MAY 31 )</strong><strong>( SFU BURNABY )</strong></p>
</div>

<div class="titleContainer" style="--height:{titleHeight}px;">
	<div class="titleDecor">
		<HomePageStuff {width} height={titleHeight} />
		<HoverGrid />
	</div>
</div>

<p class="mainDescription">
	A two week long <strong>design sprint</strong> where students push their skills in brand, user interface,
	motion, prototyping, and story driven pitching to innovate within a chosen problem space.
</p>

<StuffHoverGrid style="margin-top:rem; margin-bottom:3rem;" />

{#snippet Day1()}
	<p>PLACEHOLDER</p>
{/snippet}

<Accordian
	items={[
		{
			title: "OPENING CEREMONY",
			location: "SAYWELL HALL 10041",
			date: "17-05-2025",
			content: Day1,
		},
		{
			title: "OPENING CEREMONY",
			location: "SAYWELL HALL 10041",
			date: "17-05-2025",
			content: Day1,
		},
		{
			title: "OPENING CEREMONY",
			location: "SAYWELL HALL 10041",
			date: "17-05-2025",
			content: Day1,
		},
	]}
/>

<Typography></Typography>

{#each Array(100).keys() as _}
	<p>LONGer</p>
{/each}

<style>
	.mainDescription {
		width: 80dvw;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;

		color: var(--black);

		font-family: "Mona Sans";
		font-size: 40px;
		font-style: normal;
		font-weight: 400;
		line-height: 100%; /* 40px */

		@media only screen and (max-width: 800px) {
			font-size: 30px;
		}

		@media only screen and (max-width: 600px) {
			font-size: 25px;
		}
	}
	.titleContainer {
		position: relative;
		/* actual - bottom cover */
		height: calc(var(--height) - 1.75rem);
		width: 100%;
		overflow: hidden;
		border-bottom: var(--grey) 2px solid;
	}

	.titleDecor {
		display: flex;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.title {
		position: absolute;
		top: 15rem;
		left: 50%;

		min-height: fit-content;
		max-height: 1000px;

		transform: translate(-50%, 0);

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		z-index: 999999;
		user-select: none;
		pointer-events: none;
	}

	.imgHolder {
		position: relative;
		width: 80dvw;
		max-width: 1200px;
		height: fit-content;
	}

	.imgHolder > img {
		opacity: 0.05;
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}
		99% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		mask: url("/title.svg") exclude;
		mask-size: 100% 100%;
		backdrop-filter: invert(1) grayscale(1);
		animation: fadein 0ms both;
	}

	.title > span {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24px;
		line-height: 30px;

		margin-top: 3rem;
		margin-bottom: 3rem;
	}

	.dateText {
		margin-top: 5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-size: 20px;
		flex-flow: wrap;
	}

	@media only screen and (max-width: 360px) {
		.dateText > * {
			flex-basis: 100%;
			text-align: center;
		}
	}

	@media only screen and (max-width: 600px) {
		.title {
			top: 8rem;
		}

		.title > span {
			font-size: 16px;
			margin-top: 2rem;
		}

		.dateText {
			font-size: 16px;
		}
	}
</style>
