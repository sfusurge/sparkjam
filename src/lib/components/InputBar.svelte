<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        value: number;
        min: number;
        max: number;
        style?:string;
    }

    let { children, value = $bindable(), min, max, style }: Props = $props();
</script>

<div class="wrapper" {style}>
    {#if children !== undefined}
        {@render children()}
    {/if}
    <input
        {min}
        {max}
        type="range"
        name="weight"
        bind:value
        style="--percent: {(100 * (value - min)) / (max - min)}%;"
    />
</div>

<style>
    .wrapper {
        border: 1px solid var(--black);
        padding: 0.75rem;

        display: flex;
        align-items: center;
        gap: 0.75rem;

        width: 250px;
        
    }

    input[type="range"] {
        accent-color: var(--black);
        appearance: none;
        position: relative;
        cursor: pointer;
        height: 1rem;
    }

    input::after {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 100%;
        height: 2px;
        z-index: 1;

        border-radius: 2px;

        background-color: var(--lightGrey);
    }

    input::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: var(--percent);
        height: 2px;
        z-index: 2;

        border-radius: 2px;

        background-color: var(--black);
    }

    input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        z-index: 100;
        width: 0.75rem;
        height: 0.75rem;
        background-color: var(--black);
        border-radius: 50%;
    }

    input[type="range"]::-moz-range-progress {
        background-color:  var(--black);
    }

    input::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        border: none;
        width: 0.5rem;
        height: 0.5rem;
        background-color: var(--black);
        border-radius: 50%;
  background:  var(--black);
  cursor: pointer;
    }

    input[type="range"]::-moz-range-track {
  background-color: #84878F;
}

</style>
