<script lang="ts">
    import { pushState } from "$app/navigation";
    import { page } from "$app/state";
    import { fade, fly } from "svelte/transition";

    interface Props {
        items: {
            title: string;
            info: string;
        }[];
    }
    let { items }: Props = $props();

    let selectedIndex = $state(0);
    let selectedItem = $derived(items[selectedIndex]);

    function selectItem(idx: number) {
        selectedIndex = idx;
        pushState("", {
            showItem: true,
        });
    }
</script>

<div class="itemsContainer">
    {#each items as item, idx}
        <button
            class="item"
            onclick={() => {
                selectItem(idx);
            }}
            class:selected={selectedIndex == idx}
        >
            {#if idx == selectedIndex}
                <img
                    transition:fly={{
                        x: -5,
                    }}
                    src="/pointerRight.svg"
                    alt="pointer"
                />
            {/if}
            {item.title}
        </button>
    {/each}
</div>

{#if page.state.showItem!}
    <div class="selectedModal" transition:fade={{ duration: 100 }}>
        <span class="title">
            {selectedItem.title}
        </span>

        <span class="info">
            {selectedItem.info}
        </span>

        <button
            class="exit"
            onclick={() => {
                history.back();
            }}
        >
            <img src="/cross.svg" alt="" />
        </button>
    </div>
    <div
        transition:fade={{ duration: 100 }}
        class="background"
        onclick={() => {
            history.back();
        }}
    >
        ASDASDASDASD
    </div>
{/if}

<style>
    .background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.3;
        z-index: 9998;
    }
    .selectedModal {
        position: fixed;
        z-index: 9999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90dvw;
        max-width: 600px;
        aspect-ratio: 1/1;
        max-height: 90dvh;

        background-color: var(--white);

        display: flex;
        gap: 2rem;
        flex-direction: column;
        justify-content: flex-end;

        border: 1px solid var(--grey);

        padding: 2rem;
    }

    .title {
        color: var(--grey);
        font-size: 16px;
    }

    .info {
        font-size: 24px;
    }

    .exit {
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 2rem;
        height: 2rem;
    }

    .itemsContainer {
        display: flex;
        flex-direction: column;

        border: 1px solid black;
    }

    .item {
        position: relative;
        padding: 1rem;
        border-bottom: 1px solid var(--black);
        text-align: start;

        transition:
            color 200ms ease-out,
            background-color 200ms ease-out;
        display: flex;
        gap: 0.5rem;
        padding-left: 3rem;

        img {
            width: 1.5rem;
            position: absolute;
            top: 50%;
            left: 0.75rem;
            transform: translate(0, -50%);
        }
    }

    .item:last-child {
        border: none;
    }

    .item:hover,
    .item.selected {
        color: var(--white);
        background-color: var(--black);

        img {
            filter: invert(1);
        }
    }
</style>
