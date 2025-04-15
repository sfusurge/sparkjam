<script lang="ts">
    import { cubicIn, cubicOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    let gridDiv: HTMLDivElement | undefined = $state();
    let gridWidth = $state(0);
    let gridHeight = $state(0);
    let width = $state(0);
    let height = $state(0);
    let gridX = $state(-1);
    let gridY = $state(-1);

    const gridSize = 96;
    const half = gridSize / 2;

    function onmousemove({clientX, clientY}:{clientX:number, clientY:number}) {
        const x = clientX + half - (gridDiv?.getBoundingClientRect().left ?? 0);
        const y = clientY + half;

        if (y > height + gridSize) {
            return;
        }

        gridX = Math.floor(x / gridSize);
        gridY = Math.floor(y / gridSize);
    }

</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />
<svelte:document {onmousemove} ontouchmove={(e)=>{onmousemove(e.touches[0])}}/>

<div
    class="hoverGridParent"
    style="--size: {gridSize}px; --half:{half}px; --screenWidth: {gridWidth}px; --screenHeight: {gridHeight}px;"
>
    <div
        class="hoverGrid"
        bind:clientWidth={gridWidth}
        bind:clientHeight={gridHeight}
        bind:this={gridDiv}
    ></div>
    {#key [gridX, gridY]}
        <div
            class="block"
            style="--x: {gridX * gridSize - half}px; --y: {gridY * gridSize - half}px;"
            transition:fade={{
                duration: 250,
                easing: cubicOut,
            }}
        ></div>
    {/key}
</div>

<style>
    .hoverGridParent {
        --topOffset: 15rem;

        position: absolute;
        z-index: 0;
        pointer-events: none;
        touch-action: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        
        mask:
            url("/mask.png") 0 0 / 100dvw 100dvh,
            url("/title.svg") max(10dvw, calc((var(--screenWidth) - 1200px) / 2)) var(--topOffset) /
                min(80dvw, 1200px) auto;
        mask-composite: subtract;
        mask-mode: alpha;
        mask-repeat: no-repeat;
    }
    
    .hoverGrid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image: linear-gradient(to right, #D9DCE2 2px, transparent 2px),
            linear-gradient(to bottom, #D9DCE2 2px, transparent 2px);
        background-size: var(--size) var(--size);
        background-position: var(--half) var(--half);
      

    }

    .block {
        position: absolute;
        left: var(--x);
        top: var(--y);

        width: var(--size);
        height: var(--size);
        background: var(--rainbow-slanted) calc(-1 * var(--x)) calc(-1 * var(--y)) /
            var(--screenWidth) var(--screenHeight) no-repeat;
    }

    @media only screen and (max-width: 600px) {
        .hoverGridParent {
            --topOffset: 8rem;
        }
    }
</style>
