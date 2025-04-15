<script lang="ts">
    import HomePageStuff from "$lib/components/physics_stuff/home_pagge_stuff.svelte";

	let _width = $state(0);
	let width = $derived(Math.min(_width, 1920));
	let height = $state(0);
</script>


<svelte:window bind:innerWidth={_width} bind:innerHeight={height}/>

<div class="title">
	<img src="./title.svg" alt="SparkJam" draggable="false" >

	<span>Application Will Open<br><strong>Friday, April 18th</strong></span>
	
</div>

<HomePageStuff {width} {height}/>

<style>

	.title {
		position: absolute;
		top: 15rem;
		left: 50%;
		width: 80%;

		transform: translate(-50%, 0);

		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
	}
	.title > img {
		width: 100%;
		user-select: none;
		max-width: 1200px;
		
	}

	.title > span {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24px;
		line-height: 30px;

		margin-top: 3rem;
	}

	a {
		border: 2px solid coral;
		padding: 1rem;
		box-sizing: border-box;
	}

	@media only screen and (max-width: 600px) {
		.title {
			top: 8rem;
		}

		.title > span {
			font-size: 16px;
			margin-top: 2rem;
		}
  }
</style>


<!-- 
TOpics

* hide calendar
* login workflow
* update application

-->