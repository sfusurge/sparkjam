<script lang="ts">
	import Accordian from "$lib/components/Accordian/Accordian.svelte";
	import CanvasWrapper from "$lib/components/canvas/CanvasWrapper.svelte";
	import Schedule from "$lib/components/canvas/picker/Schedule.svelte";
	import CountDown from "$lib/components/CountDown.svelte";
	import DesktopQa from "$lib/components/DesktopQA.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import HoverGrid from "$lib/components/HoverGrid.svelte";
	import MobileQa from "$lib/components/MobileQA.svelte";
	import RainbowButton from "$lib/components/RainbowButton.svelte";
	import ScrollSnapper from "$lib/components/ScrollSnapper.svelte";
	import StuffHoverGrid from "$lib/components/StuffHoverGrid.svelte";
	import TopBar from "$lib/components/TopBar.svelte";
	import Typography from "$lib/components/Typography.svelte";
	import { QA } from "./content.ts";
	import SuikaSection from "$lib/components/SuikaSection.svelte";
	import Credits from "$lib/components/Credits/Credits.svelte";

	let _width = $state(0);
	let width = $derived(Math.min(_width, 1920));
	let height = $state(0);
	let titleHeight = $derived(Math.max(Math.min(height * 0.75, 1280), 600));
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
	]}
/>

<div class="title" draggable="false">
	<div class="imgHolder">
		<img src="./title.svg" alt="SparkJam" width="1198" height="228" />
		<div class="mask"></div>
	</div>

	<p class="date">
		<strong>( MAY 17 - MAY 31 )</strong>
		<strong>( SFU BURNABY )</strong>
	</p>

	<RainbowButton>
		<a href="" target="_blank" title="Save Event in Google Calendar"> GET YOUR TICKETS </a>
	</RainbowButton>
</div>

<div class="titleContainer" style="--height:{titleHeight}px;">
	<div class="titleDecor">
		<!-- <HomePageStuff {width} height={titleHeight} /> -->
		<HoverGrid />
	</div>
</div>

<p class="mainDescription">
	A two week long <strong>design sprint</strong> where students push their skills in brand, user interface,
	motion, prototyping, and story driven pitching to innovate within a chosen problem space.
</p>

<StuffHoverGrid style="margin-top:2rem; margin-bottom:3rem;" />

{#snippet Day1()}
	<Schedule
		items={[
			{
				label: "Doors Open",
				time: "9:00am",
			},
			{
				label: "Ceremony Begins",
				time: "11:00am",
			},
			{
				label: "Judge Panel",
				time: "11:30am",
			},
			{
				label: "Student Panel",
				time: "12:00pm",
			},
			{
				label: "Lunch (included)",
				time: "12:30pm",
			},
			{
				label: "Case Reveal",
				time: "1:30pm",
			},
		]}
	/>
{/snippet}

{#snippet Day2()}
	<p class="scheduleLabel">
		Eech team will receive a 20-minite slot between 11:00am to 2:00pm, where they will present
		their work to a team of mentors for feedback.
	</p>
{/snippet}

{#snippet Day3()}
	<p class="scheduleLabel">
		All projects must be submitted to OtterTable by 11:59pm on the 28th of May. Late submissions
		will be disquliafied, and no exceptions will be made.
	</p>
{/snippet}

{#snippet Day4()}
	<Schedule
		items={[
			{
				label: "Doors Open",
				time: "9:00am",
			},
			{
				label: "Ceremony Begins",
				time: "11:00am",
			},
			{
				label: "Winners Presentations",
				time: "11:30am",
			},
			{
				label: "Lunch",
				time: "12:30pm",
			},
			{
				label: "Networking Period",
				time: "1:30pm",
			},
		]}
	/>
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
			title: "CRITQUE DAY",
			location: "SAYWELL HALL 10041",
			date: "24-05-2025",
			content: Day2,
		},
		{
			title: "SUBMISSIONS DUE",
			location: "REMOTE",
			date: "28-05-2025",
			content: Day3,
		},
		{
			title: "CLOSING CEREMONY",
			location: "SAYWELL HALL 10041",
			date: "31-05-2025",
			content: Day4,
		},
	]}
/>

<ScrollSnapper margin={height * 0.2} topPadding={height * 0.1} />

<div class="canvasContainer" style="border-bottom: 1px solid var(--black);">
	<CanvasWrapper />
</div>
<Typography></Typography>

<SuikaSection></SuikaSection>

{#if width < 1200}
	<div class="mobileQA">
		<MobileQa items={QA}></MobileQa>
	</div>
{:else}
	<div class="qaWrapper">
		<DesktopQa items={QA} />
	</div>
{/if}

<CountDown />

<Credits />

<Footer></Footer>

<style>
	.mobileQA {
		max-width: 90dvw;
		margin-left: auto;
		margin-right: auto;
	}

	.qaWrapper {
		max-width: 80rem;
		margin-left: auto;
		margin-right: auto;
	}
	.canvasContainer {
		width: 100%;
		height: 80dvh;
	}

	p.scheduleLabel {
		max-width: 500px;
		text-align: start;
		color: var(--grey);
		line-height: 16px;
		font-size: 16px;
	}

	.mainDescription {
		width: 80dvw;
		max-width: 80rem;
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
		max-width: 80rem;
		height: fit-content;
	}

	.imgHolder > img {
		opacity: 0.05;
		width: 100%;
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

		mask: url("/title.svg");
		mask-size: 100% 100%;
		backdrop-filter: invert(1) grayscale(1);
		animation: fadein 0ms both;
	}

	.date {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-flow: wrap;
		padding: 1rem;
	}

	@media only screen and (max-width: 600px) {
		.title {
			top: 8rem;
		}

		.date {
			display: flex;
			flex-flow: wrap;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}

		
	}
</style>
