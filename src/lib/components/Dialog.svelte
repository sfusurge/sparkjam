<script lang="ts">
    import type { Snippet } from "svelte";
    import { fade } from "svelte/transition";

    const {
        children,
        style,
        visible = $bindable(false),
        onclose,
    }: {
        children: Snippet;
        visible: boolean;
        style?: string;
        onclose: () => void;
    } = $props();
</script>

{#if visible}
    <div class="modal" transition:fade={{ duration: 100 }} {style}>
        {@render children()}
        <button class="exit" onclick={onclose}>
            <img src="/cross.svg" alt="" />
        </button>
    </div>

    <div transition:fade={{ duration: 100 }} class="background" onclick={onclose}></div>
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
    .modal {
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

        padding: 3rem;
        padding-top: 5rem;
    }

    .exit {
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 2rem;
        height: 2rem;
    }
</style>
