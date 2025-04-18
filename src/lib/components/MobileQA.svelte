<script lang="ts">
    interface Props {
        items: {
            title: string;
            info: string;
        }[];
    }
    let { items }: Props = $props();

    let selectedIndex = $state(0);
    let selectedItem = $derived(items[selectedIndex]);
</script>

<div class="itemsContainer">
    {#each items as item}
        <button class="item">
            {item.title}
        </button>
    {/each}
</div>

<style>
    .itemsContainer {
        display: flex;
        flex-direction: column;

        border: 1px solid black;
    }

    .item {
        padding: 1rem;
        border-bottom: 1px solid var(--black);
        text-align: start;

        transition: color 200ms ease-out, background-color 200ms ease-out;
    }

    .item:last-child {
        border: none;
    }

    

</style>
