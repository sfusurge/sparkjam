<script lang="ts">
    import { pushState, replaceState } from "$app/navigation";
    import { page } from "$app/state";
    import RainbowButton from "$lib/components/RainbowButton.svelte";

    interface NavBarProps {
        items: {
            label: string;
            target: string;
        }[];
    }

    const { items }: NavBarProps = $props();

    let width = $state(0);
    let ref: HTMLDivElement | undefined = $state();
</script>

<svelte:window bind:innerWidth={width} />

<nav class="navContainer">
    <div class="navRow">
        {#if width > 768}
            {#each items as item}
                <button class="navBtn">
                    <a href={item.target}
                        ><span class="navLabel">
                            {item.label}
                        </span></a
                    >
                </button>
            {/each}
        {:else}
            <button
                onclick={() => {
                    console.log("WHAT");

                    if (!page.state.showNav) {
                        pushState("", {
                            showNav: true,
                        });
                    } else {
                        history.back();
                    }
                }}
                ><img
                    src={page.state.showNav ? "cross.svg" : "/bars.svg"}
                    alt="more options"
                    style="width: 2rem; margin-left:1.25rem;"
                /></button
            >
        {/if}
        <RainbowButton style="margin-left:auto" disableBottomBorder
            ><a href="https://portal.sfusurge.com/application">TICKETS</a></RainbowButton
        >
    </div>

    {#if width <= 768}
        <div
            class="contentContainer"
            style="--contentHeight: {ref?.offsetHeight}px"
            class:extended={page.state.showNav}
        >
            <div class="content" bind:this={ref}>
                {#each items as item}
                    <button class="navBtn" style="width: 100%;">
                        <a
                            href={item.target}
                            onclick={() => {
                                replaceState("", {});
                            }}
                        >
                            <span class="navLabel">
                                {item.label}
                            </span></a
                        >
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</nav>

<style>
    a {
        position: relative;
        display: block;
        width: 100%;
display: flex;
justify-content: space-around;
    }

    .navLabel {
        display: block;
        position: relative;
        width: fit-content;
    }
    
    .navBtn:hover > a > .navLabel::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0.25rem;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid var(--black);
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    .contentContainer {
        max-height: 0;
        transition: max-height 150ms cubic-bezier(0.47, 1.64, 0.41, 0.8);

        overflow: hidden;
    }
    .contentContainer.extended {
        max-height: var(--contentHeight);
    }

    .navRow {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    nav.navContainer {
        position: fixed;
        top: 0;
        left: 50%;
        z-index: 1000000;
        transform: translate(-50%, 0);

        width: 100dvw;
        max-width: var(--widthLimit);

        display: flex;
        flex-direction: column;

        border-bottom: 1px solid var(--black);
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

        transition: color 100ms ease-out;
    }



    .navBtn:hover {
        color: var(--black);
    }

</style>
