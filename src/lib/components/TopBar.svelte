<script lang="ts">
    import RainbowButton from "$lib/components/RainbowButton.svelte";

    interface NavBarProps {
        items: {
            label: string;
            target: string;
        }[];
    }

    const { items }: NavBarProps = $props();

    let width = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

<nav class="navContainer">
    {#each items as item}
        <button class="navBtn">
            <a href={item.target}
                ><span class="navLabel">
                    {item.label}
                </span></a
            >
        </button>
    {/each}

    <RainbowButton style="margin-left:auto" disableBottomBorder>TICKETS</RainbowButton>
</nav>

<style>
    nav.navContainer {
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 1000000;
        transform: translate(-50%, 0);

        width: 100dvw;
        max-width: var(--widthLimit);

        display: flex;
        flex-direction: row;

        border-bottom: 2px solid var(--black);
        background-color: var(--white);
    }

    .navBtn {
        position: relative;
        padding: 1rem;

        color: var(--grey);

        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;

        transition: color 200ms ease-out;
    }

    .navBtn::after {
        content: "";
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        width: calc(100% - 2rem);
        transform: translate(-50%, 0);

        transition: border-color 200ms ease-out;
        border-bottom: 2px solid transparent;
    }

    .navBtn:hover {
        color: var(--black);
    }

    .navBtn:hover::after {
        border-color: var(--black);
    }
</style>
