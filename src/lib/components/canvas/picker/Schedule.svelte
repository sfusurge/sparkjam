<script lang="ts">
    interface ScheduleProp {
        items: {
            label: string;
            time: string;
        }[];
    }

    const { items }: ScheduleProp = $props();
</script>

<div class="scheduleContainer scroll-mt-48" >
    {#each items as item}
        <div class="scheduleItem">
            <span>{item.label}</span>
            <span>{item.time}</span>
        </div>
    {/each}
</div>

<style>
    .scheduleContainer {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        width: 500px;
        max-width: 100%;
    }

    .scheduleItem {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--grey);
        color: var(--grey);
        font-size: 14px;
        transition: border-color 200ms ease-out, color 200ms ease-out;
    }


    .scheduleItem:hover {
        color: var(--black);
        border-color: var(--black);
    }
</style>
