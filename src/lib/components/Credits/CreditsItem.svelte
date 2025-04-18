<script lang="ts">

    interface Props {
        title: string;
        items: string[];
    }

    const { title, items }: Props = $props();
</script>

<div class="flex gap-4 flex-col">
    <span class="text-[#84878F]">{title}</span>
    <div class="flex flex-col">
        {#each items as item}
            <span class="font-semibold flex-1">{item}</span>
        {/each}
    </div>
</div>