<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title: string;
        location: string;
        date: string;
        content: Snippet;
    }

    const { title, location, date, content }: Props = $props();

    let contentDiv: HTMLDivElement | undefined = $state();
    let extended = $state(false);
    let width = $state(0);
    let isMobile = $derived(width < 768);
</script>

<svelte:window bind:innerWidth={width} />

<button
    class="acorItem"
    onclick={() => {
        extended = !extended;
    }}
    class:extended
>
    <div class="itemRow" class:extended>
        <span style="flex:1; font-weight:700;"> {title}</span>

        {#if !isMobile}
            <span class="location"> {location} </span>
        {/if}
        <span class="date"> {date} </span>
        {#if !isMobile}
            <span class="arrowBtn" class:extended>
                <img src="/home/otter.svg" alt="arrow" />
            </span>
        {/if}
    </div>

    <div
        class="itemContentWrapper"
        class:extended
        style="--contentHeight: {contentDiv?.clientHeight}px;"
    >
        <div class="itemContent" bind:this={contentDiv}>
            {#if isMobile}
                <span class="location" style="margin-right:auto;">

                    {location}
                </span>
            {/if}
            {@render content()}
        </div>
    </div>
</button>

<style>
    .acorItem:last-child {
        border: none;
    }

    .acorItem {
        border-bottom: 2px solid var(--grey);
        padding: 1rem 5rem;
        cursor: auto;
        transition: background-color 200ms ease-out;
    }

    .acorItem:hover:not(.extended) {
        background-color: var(--black);
    }

    .itemRow {
        width: 100%;
        display: flex;
        gap: 2rem;
        font-weight: 600;
        align-items: center;
        cursor: pointer;
        transition: filter 200ms ease-out;
    }

    .acorItem:hover:not(.extended) > .itemRow {
        filter: invert(1);
    }

    span {
        line-height: 100%;
        text-align: start;
    }

    .location {
        width: 200px;
    }

    .date {
        width: 100px;
    }

    .arrowBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 200ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
    }

    .arrowBtn.extended {
        transform: rotate(180deg);
    }

    .arrowBtn > img {
        min-width: 3rem;
        max-width: 3rem;
    }

    .itemContentWrapper {
        position: flex;

        max-height: 0;
        overflow: hidden;

        transition: max-height 200ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
    }

    .itemContentWrapper.extended {
        max-height: var(--contentHeight);
    }

    .itemContent {
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
