<script lang="ts">
    import { fly, slide } from "svelte/transition";

    interface Props {
        items: {
            title: string;
            info: string;
        }[];
    }

    let { items }: Props = $props();

    let selectedIndex = $state(0);
    let selectedQuestion = $derived(items[selectedIndex]);
</script>

<div class="qaContainer">
    <div class="titlelist">
        {#each items as item, index}
            <button
                onclick={() => {
                    selectedIndex = index;
                }}
                class="titleItem"
                class:selected={index === selectedIndex}
            >
                {#if index == selectedIndex}
                    <img
                        transition:fly={{
                            x: -5,
                        }}
                        src="/pointerRight.svg"
                        alt="pointer"
                    />
                {/if}
                <span>{item.title}</span>
            </button>
        {/each}
    </div>

    <div class="contentContainer">
        <div class="content">
            <span class="title">
                {selectedQuestion.title}
            </span>
            <span class="info">{selectedQuestion.info}</span>
        </div>

        <div class="buttons">
            <button
                onclick={() => {
                    selectedIndex = Math.max(0, selectedIndex - 1);
                }}
            >
                <img src="/pointerLeft.svg" alt="" />
            </button>
            <button
                onclick={() => {
                    selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
                }}><img src="/pointerRight.svg" alt="" /></button
            >
        </div>
    </div>
</div>

<style>
    .qaContainer {
        width: 100%;
        height: fit-content;
        min-height: 500px;
        border: 1px solid var(--grey);

        display: flex;
        flex-direction: row;
    }

    .titlelist {
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--grey);

        overflow-y: auto;
        scrollbar-width: thin;

        flex: 1;
        max-width: 450px;
    }

    .titleItem {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        padding: 1rem;
        padding-left: 2.5rem;
        

        font-size: 20px;

        background-color: var(--white);
        border-bottom: 1px solid var(--grey);

        transition:
            background-color 200ms ease-out,
            color 200ms ease-out;
    }

    .titleItem:last-child {
        border: none;
    }

    .titleItem:hover,
    .titleItem.selected {
        color: var(--white);
        background-color: var(--black);
    }

    .titleItem:hover > img,
    .titleItem.selected > img {
        filter: invert(1);
    }

    .titleItem > img {
        width: 1.5rem;
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translate(0, -50%);
    }

    .contentContainer {
        flex:1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .content {
        margin: 3rem;

        display: flex;
        position: relative;

        flex-direction: column;
        justify-content: flex-end;
    }

    .title {
        color: var(--grey);
        font-size: 24px;
    }

    .info {
        font-size: 36px;
    }

    .buttons {
        position: absolute;
        top: 3rem;
        right: 3rem;

        display: flex;
        gap: 2rem;
    }

    button > img {
        width: 2.5rem;
    }
</style>
