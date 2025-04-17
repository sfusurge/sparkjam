<script lang="ts">
    import { cubicIn, cubicOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    const { style }: { style?: string } = $props();

    const items: string[] = [
        "home/box.svg",
        "home/otter.svg",
        "home/bundle.svg",
        "home/star.svg",
        "home/asterisk.svg",
    ];

    let gridDiv: HTMLDivElement | undefined = $state();

    let gridX = $state(-1);
    let gridY = $state(-1);

    let rows = $state(2);

    const gridSize = 128;
    const seed = Math.random();

    function onpointermove({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
        const x = offsetX;
        const y = offsetY;

        gridX = Math.floor(x / gridSize);
        gridY = Math.floor(y / gridSize);
    }

    function clear() {
        gridX = -20;
        gridY = -20;
    }

    function prng(x: number, y: number, seed: number) {
        return Math.abs(Math.sin(x * 12.23 + y * 62.65 + seed * 5.234) % 1);
    }
</script>

<div
    class="stuffContainer"
    style="--height: {rows * gridSize}px; {style ?? ''}"
    bind:this={gridDiv}
    {onpointermove}
    onpointerdown={onpointermove}
    onpointerup={clear}
    onpointerleave={clear}
    onpointercancel={clear}
>
    {#key [gridX, gridY]}
        <div
            class="item"
            style={`
            --x: ${gridX * gridSize}px; 
            --y: ${gridY * gridSize}px; 
            --size: ${gridSize}px; background-image:url(${
                items[Math.floor(prng(gridX, gridY, seed) * items.length)]
            });
            rotate: ${360 * prng(gridX, gridY, seed)}deg;
            `}
            transition:fade={{
                duration: 250,
                easing: cubicOut,
            }}
        ></div>
    {/key}
</div>

<style>
    .stuffContainer {
        position: relative;
        width: 100%;
        height: var(--height);
    }

    .item {
        position: absolute;
        left: var(--x);
        top: var(--y);
        width: var(--size);
        height: var(--size);

        background-size: 100% auto;
        background-repeat: no-repeat;

        pointer-events: none;
        touch-action: none;
    }
</style>
