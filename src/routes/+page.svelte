<script lang="ts">
	import HoverGrid from "$lib/components/HoverGrid.svelte";
	import HomePageStuff from "$lib/components/physics_stuff/home_pagge_stuff.svelte";
	import RainbowButton from "$lib/components/RainbowButton.svelte";

	let _width = $state(0);
	let width = $derived(Math.min(_width, 1920));
	let height = $state(0);
</script>

<svelte:window bind:innerWidth={_width} bind:innerHeight={height} />

<div class="title" draggable="false">
	<div class="imgHolder">
		<img src="./title.svg" alt="SparkJam" width="1198" height="228" />
		<div class="mask"></div>
	</div>

	<span>Application Will Open<br /><strong>Friday, April 18th</strong></span>

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

<HomePageStuff {width} {height} />
<HoverGrid />




<!-- 
TOpics

* hide calendar
* login workflow
* update application

-->

<style>
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

	@keyframes fadein{
		0% {opacity: 0;}
		99% {opacity: 0;}
		100% {opacity: 1;}
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
		margin-top: 10rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-size: 20px;
		flex-flow: wrap;
	}

	@media only screen and (max-width: 360px) {
		.dateText > *{
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
