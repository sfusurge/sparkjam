<script lang="ts">
  import Landing from "$lib/components/landing/Landing.svelte";
  import HomePageStuff from "$lib/components/physics_stuff/home_pagge_stuff.svelte";

  import { transitionType } from "$lib/components/utils/ViewTransitionState.svelte.ts";
</script>

<Landing></Landing>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<a
  href="canvas"
  onclick={() => {
    transitionType.transition = "fadeLeft";
  }}>Canvas</a
>

<a
  href="game"
  onclick={() => {
    transitionType.transition = "up";
  }}>Game</a
>

<div class="tester">BALH BLAH</div>

<HomePageStuff />
<h1>rcfgvhgbvhb</h1>

<!-- 
TOpics

* hide calendar
* login workflow
* update application

-->

<style>
  .tester {
    position: absolute;
    right: 0;
    border: blue 6px solid;
  }
  a {
    border: 2px solid coral;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>
