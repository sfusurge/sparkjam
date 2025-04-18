<script lang="ts">
    import RainbowButton from "$lib/components/RainbowButton.svelte";
    import { SvelteDate } from "svelte/reactivity";

    const deadline = new Date(2025, 3, 30, 23, 59, 59);
    let currentTime = new SvelteDate();
    let diff = $derived(deadline.getTime() - currentTime.getTime());
    let days = $derived(Math.floor(diff / (1000 * 60 * 60 * 24)));
    let hours = $derived(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = $derived(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));

    $effect(() => {
        const interval = setInterval(() => {
            currentTime.setTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<div class="countdownContainer">
    <div class="countdown">
        <span class="title"> Applications close in </span>

        <div class="numbers">
            <div class="number day">{days}</div>
            <div class="number hour">{hours}</div>
            <div class="number minute">{minutes}</div>
        </div>

        <RainbowButton style="margin-top:2rem;">
            <a href="#">GET YOUR TICKETS</a>
        </RainbowButton>
    </div>

    <img src="BigOtter.svg" alt="Big SFU Otter" class="otter" />
    <img src="BigSurge.svg" alt="Big SFU Surge Logo" class="surge" />
</div>

<style>

    .otter {
        position: absolute;
        left: 0;
        bottom: -100px;

        width: 300px;
        max-width: 40dvw;

        @media screen and (max-width: 600px){
            bottom:-70px;
        }
    }

    .surge {
        position: absolute;
        right: -80px;
        bottom: -100px;

        width: 300px;
        max-width: 40dvw;

        @media screen and (max-width: 600px){
            bottom:-50px;
        }
    }

    .countdownContainer {
        height: 600px;
        max-height: 100dvh;
        position: relative;

        border-bottom: 1px solid var(--black);
        overflow: hidden;

    }

    .countdown {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .title {
        font-size: 30px;
    }

    .numbers {
        display: flex;
        flex-direction: row;
        gap: 4rem;
    }

    .number {
        position: relative;
        font-size: 80px;
        font-weight: 500;
        line-height: 100px;
    }

    .number::after {
        position: absolute;
        left: 50%;
        bottom: -1rem;
        transform: translate(-50%, 0);
        font-size: 14px;
        color: var(--grey);
        width: fit-content;
        line-height: 1rem;
        white-space: nowrap;
    }

    .day::after {
        content: "( DAYS )";
    }

    .hour::after {
        content: "( HOURS )";
    }

    .minute::after {
        content: "( MINUTES )";
    }
</style>
