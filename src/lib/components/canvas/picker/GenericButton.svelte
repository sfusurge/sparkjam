


<script lang="ts">
    import type { Snippet } from "svelte";

    
    const {style, onclick, children, title}: {title?:string, style?:string, children:Snippet, onclick?:(e:MouseEvent)=>void} = $props();

    

</script>

<button class="btn" {style} {onclick} {title}>
    {@render children()}
</button>

<style>
    .btn {
        padding: 0.25rem;
        border: 1px solid var(--black);
        height: fit-content;
        aspect-ratio: 1;
        background-color: var(--white);
        transition: filter 100ms ease-out;
        text-wrap: nowrap;
    }

    .btn:hover{
        filter: invert(1);
    }
</style>