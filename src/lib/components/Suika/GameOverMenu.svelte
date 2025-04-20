<script lang="ts">
    import {updateLeaderboard, getLeaderboard} from '../../firebase/SuikaLeaderboardManager'
    import { leaderboardPreset } from '../Leaderboard/LeaderboardController.svelte'
    import {anonymousAliases} from './SuikaController.svelte'

    var leaderboard = $state(leaderboardPreset)

    interface stageParams {
        resetGame: () => void;
        closeWindow: () => void;
        points: number;
    }

    interface popupConfig{
        title: string
        func: () => void
    }

    const PopupModes = {
        gameOver: 0,
        leaderboard: 1,
        evolutions: 2
    }

    let {resetGame, points, closeWindow} : stageParams = $props();
    let popupMode = $state(PopupModes.gameOver)
    let lightTheme = $state(popupMode == PopupModes.gameOver)

    export const setPopupMode = (mode: number) => {
        popupMode = mode
        lightTheme = mode == PopupModes.gameOver
        if(popupMode == PopupModes.leaderboard){
            fetchLeaderboard()
        }
    }

    const fetchLeaderboard = async () => {
        try{
            let tLeaderboard = await getLeaderboard()
            leaderboard = tLeaderboard??leaderboard
        }catch (e){
            console.log(e)
        }
    }

    $effect(() => {
        fetchLeaderboard()
    })

    const popupConfigs:popupConfig[] = [
        {
            title: "GAME OVER",
            func: finishRound
        },
        {
            title: "TOP 5",
            func: closeWindow
        },
        {
            title: "EVOLUTIONS",
            func: closeWindow
        }
    ]

    let userName = $state("");

    async function finishRound(){
        await addToScoreboard(points)
        resetGame()
    }

    async function addToScoreboard(pts :number){
        console.log("post1")
        let username = userName
        const fillernames = anonymousAliases
        if(username === ""){
            username = fillernames[Math.floor(Math.random() * fillernames.length)]
        }
        
        await updateLeaderboard({
            username: username,
            points: pts
        })
    }
</script>

<div id="popUp" class="midAlign" class:lightTheme={lightTheme == true} class:darkTheme={lightTheme == false}>
    <div id="topArea">
        <p id="popupTitle">({popupConfigs[popupMode].title})</p>
        <img src={`./suika/${lightTheme ? "ex" : "ex light"}.svg`} onclick={() => popupConfigs[popupMode].func()}/>
    </div>
    {#if popupMode == PopupModes.gameOver}
        <p>FINAL SCORE: {points}</p>
        <br/>
        <input type="text" placeholder="Your Name" bind:value={userName}/>
        <br/>
        <button onclick={() => finishRound()} class:hide={userName.length <= 0}><img src='./suika/sparkles.png'>Play Again</button>
    {/if}
    {#if popupMode == PopupModes.leaderboard}
        <div id="scoreContainer">
            {#each leaderboard as playerScore}
                <div class="entry">
                    <p class="entryName">{playerScore.username}</p>
                    <p class="entryScore">SCORE: {playerScore.points}</p>
                </div>
            {/each}
        </div>
    {/if}
    {#if popupMode == PopupModes.evolutions}
        <img id="evo" src="./suika/evolutions/Evolution Chart.svg"/>
    {/if}
</div>

<style>
    
    #topArea{
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        margin-top: -1rem;
        width: 80%;
        font-size: 1rem;

        img{
            margin: auto 0;
            height: 15px;
            width: 15px;
            cursor: pointer;
        }
    }

    #popUp{
        height: 400px;
        width: 90%;
        max-width: 400px;
        --grey: var(--lightGrey);
        border: 1px solid var(--grey);
    }

    .lightTheme{
        color: black;
        background-color: white;
    }

    .darkTheme{
        color: var(--grey);
        background-color: var(--black);
    }

    .midAlign{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        height: 100%;
    }

    .hide{
        visibility: collapse !important;
    }

    input{
        width: 70%;
        font-size: 2rem;
        text-align: center;
        padding-top: 1rem;
        border: none;
        border-bottom: lightgrey 2.5px solid !important;
        font-family: 'poppins', sans-serif;
        background-color: #00000000;
        color: black;
        margin: 15px 0;
    }

    input:focus{
        border-bottom: #568cdb 2.5px solid !important;
        outline: none;
        caret-color: var(--grey);
    }

    button {
        margin: 10px 0;

        display: flex;
        width: fit-content;
        padding: 0.5rem 1.75rem;
        border-radius: 2px;
        border: black solid 1px;
        
        font-size: 1rem;
        font-weight: 900;
        color: black;
        background-color: white !important;

        cursor: pointer;

        img{
            height: fit-content;
            width: fit-content;
            margin-top: auto;
            margin-bottom: auto;
            margin-right: 5px;
        }
    }

    button:hover{
        background-color: hsl(220 20% 10%) !important;
        color: white;
        
        img{
            filter: invert();
        }
    }

    p{
        text-align: center;
    }

    #evo{
        width: 80%;
        max-width: 250px;
    }

    #scoreContainer{
        height: 70%;
        max-height: 325px;
        width: 80%;
    }
    .entryName{
        font-weight: 600;
    }
    
    .entryScore{
        font-weight: 100;
    }

    .entry{
        margin-bottom: 0.5rem;
    
        p{
            text-align: left;
            font-size: small;
            text-overflow: clip;
            text-wrap-mode: nowrap;
        }
    }

    @media only screen and (max-width: 500px) {

        #popUp{
            width: 90%;
        }
    }
</style>