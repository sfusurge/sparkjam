<script lang="ts">
	import Accordian from "$lib/components/Accordian/Accordian.svelte";
	import CanvasWrapper from "$lib/components/canvas/CanvasWrapper.svelte";
	import MultiplayerCanvas from "$lib/components/canvas/MultiplayerCanvas.svelte";
	import Schedule from "$lib/components/canvas/picker/Schedule.svelte";
	import DesktopQa from "$lib/components/DesktopQA.svelte";
    import Footer from "$lib/components/Footer.svelte";
	import HoverGrid from "$lib/components/HoverGrid.svelte";
	import MobileQa from "$lib/components/MobileQA.svelte";
	import HomePageStuff from "$lib/components/physics_stuff/home_pagge_stuff.svelte";
	import RainbowButton from "$lib/components/RainbowButton.svelte";
	import ScrollSnapper from "$lib/components/ScrollSnapper.svelte";
	import StuffHoverGrid from "$lib/components/StuffHoverGrid.svelte";
	import TopBar from "$lib/components/TopBar.svelte";
	import Typography from "$lib/components/Typography.svelte";
	import Credits from "$lib/components/Credits/Credits.svelte";

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
		Eech team will receive a 20-minite slot between 11:00am to 2:00pm, where they will present
		their work to a team of mentors for feedback.
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

<ScrollSnapper margin={200} topPadding={height * 0.1} />

<div class="canvasContainer" style="border-bottom: 1px solid var(--black);">
	<CanvasWrapper />
</div>
<Typography></Typography>

<div class="qaWrapper">
	<DesktopQa
		items={[
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
		]}
	/>
</div>

<div class="mobileQA">
	<MobileQa
		items={[
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
			{
				title: "Who is eligible to attend SparkJam",
				info: "SparkJam is open to all university level students. This includes students from UBC, SFU, BCIT, Emily Carr, and more!",
			},
		]}
	></MobileQa>
</div>

<Credits />

<Footer></Footer>

<style>
	.qaWrapper {
		max-width: 1200px;
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

		mask: url("/title.svg");
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
