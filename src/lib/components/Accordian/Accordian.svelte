<script lang="ts">
    import AccordianItem from "$lib/components/Accordian/AccordianItem.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        items: {
            title: string;
            location: string;
            date: string;
            content: Snippet;
        }[];
    }

    const { items }: Props = $props();
    let width = $state(0);
    let isMobile = $derived(width < 768);
</script>

<svelte:window bind:innerWidth={width} />

<div class="accordianContainer">
    <div class="titleRow">
        <span style="flex:1;">( SCHEDULE )</span>

        {#if !isMobile}
            <span class="location">( LOCATION )</span>
        {/if}

        <span class="date">( DATE )</span>

        {#if !isMobile}
            <div class="blank"></div>
        {/if}
    </div>

    {#each items as item}
        <AccordianItem {...item} />
    {/each}
</div>

<style>
    .accordianContainer {
        position: relative;
        display: flex;
        flex-direction: column;

        width: 100%;
        height: fit-content;

        border-bottom: 2px solid var(--grey);
    }

    .titleRow {
        width: 100%;
        display: flex;
        gap: 2rem;
        padding-left: 5rem;
        padding-right: 5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--grey);
    }

    .location {
        width: 200px;
    }

    .date {
        width: 100px;
    }

    span {
        color: var(--grey);
        font-size: 16px;
    }

    .blank {
        width: 3rem;
    }
</style>
