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
</script>

<div class="accordianContainer">
    <div class="titleRow">
        <span style="flex:1;">( SCHEDULE )</span>
        <span class="location">( LOCATION )</span>
        <span class="date">( DATE )</span>
        <div class="blank"></div>
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
