<script lang="ts">
    import Leaderboard from "./Leaderboard/Leaderboard.svelte";
    import Suika from "./Suika/Suika.svelte";

    let leaderBoard: Leaderboard;
    let score = $state(0);

    let width = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

<div id="suikaContainer">
    <div id="bgGrid"></div>

    {#if width > 1200}
        <div id="stats">
            <p id="scorePts">{score}</p>
            <div id="leaderboard">
                <Leaderboard bind:this={leaderBoard} />
            </div>
        </div>
    {/if}
    <Suika
        updateLeaderboard={() => {
            console.log("update");
        }}
        updateScore={(pts: number) => {
            score = pts;
        }}
    />
    {#if width > 1200}
        <div id="rightPanel">
            <img id="evoStages" src="./suika/evolutions/Evolution Chart.svg" />
        </div>
    {/if}
</div>

<style>
    #suikaContainer {
        position: relative;
        display: flex;
        flex-direction: row;
        background: linear-gradient(to right, #57585b36 2px, transparent 2px),
            linear-gradient(to bottom, #57585b36 2px, transparent 2px), var(--black);
        background-size: 75px 75px;



        width: 100%;
        height: 70dvh;
        min-height: 1200px;
        overflow: auto;
        justify-content: center;
        align-items: flex-end;

        padding: 2rem;
        margin-bottom: 4rem;
    }
    /* #bgGrid {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        background-image: linear-gradient(to right, var(--grey) 2px, transparent 2px),
            linear-gradient(to bottom, var(--grey) 2px, transparent 2px);
        background-size: 75px 75px;
        width: 100%;
        opacity: 0.2;
        height: 100%;
        pointer-events: none;
    } */

    /* 

    #suikaContainer{
        --lGrey: #EEEEEE11;

        width: 100%;
		height: 100dvh;
        background-color: var(--black);
        margin: calc(var(--spacing) * 24) 0;
        color: white;
        display: flex;
    }

    #bgGrid{
        position: absolute;
        z-index: 0;
        background-image: linear-gradient(to right, var(--lGrey) 2px, transparent 2px),
                linear-gradient(to bottom, var(--lGrey) 2px, transparent 2px);
        background-size: 75px 75px;
        width: 100%;
        height: 100dvh;
    }

    #stats{
        height: 100%;
        width: 200px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        p{
            text-align: left !important;
        }
        padding: 10% 20%;
        padding-left: 20%;
        padding-right: 15%;
        padding-top: 200px;
        padding-bottom: 5%;

        #scorePts{
            font-weight: 600;
            font-size: 1.5rem;
        }
    }

    #rightPanel{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        padding-bottom: 75px;
    }

    #evoStages{
        width: 100%;
    } */
</style>
