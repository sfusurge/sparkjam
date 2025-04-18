<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        value: number;
        min: number;
        max: number;
    }

    let { children, value = $bindable(), min, max }: Props = $props();
</script>

<div class="wrapper">
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
        padding: 0.5rem;

        display: flex;
        align-items: center;
        gap: 0.5rem;

        width: fit-content;
    }

    input {
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
        appearance: none;

        position: relative;
        z-index: 100;
        width: 0.3rem;
        height: 0.3rem;
        background-color: var(--black);
        border-radius: 50%;
    }
</style>
