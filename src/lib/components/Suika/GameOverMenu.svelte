<script lang="ts">
    // import {updateLeaderboard} from '../Firebase/SuikaLeaderboardManager'
    import {anonymousAliases} from './SuikaController.svelte'

    interface stageParams {
        resetGame: () => void;
        points: number;
    }

    let {resetGame, points} : stageParams = $props();

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
        
        // await updateLeaderboard({
        //     username: username,
        //     points: pts
        // })
    }
</script>

<div id="gameEndScreen" class="midAlign">
    <div id="topArea">
        <p id="popupTitle">(GAME OVER)</p>
    </div>
    <p>FINAL SCORE: {points}</p>
    <br/>
    <input type="text" placeholder="Your Name" bind:value={userName}/>
    <br/>
    <button onclick={() => finishRound()} class:hide={userName.length <= 0}><img src='./suika/sparkles.png'>Play Again</button>
</div>

<style>
    
    #topArea{
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        margin-top: -1rem;
        width: 100%;
        font-weight: 600;
        font-size: 1.5rem;
    }

    #gameEndScreen{
        height: 400px;
        color: black;
        background-color: white;
        width: fit-content;
        --grey: var(--surge-grey);

        img{
            margin-right: 10px;
        }
    }

    .midAlign{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        height: 100%;
    }

    .hide{
        visibility: collapse !important;
    }

    input{
        width: 80%;
        font-size: 2rem;
        text-align: center;
        padding-top: 1rem;
        border: none;
        border-bottom: lightgrey 2.5px solid !important;
        font-family: 'poppins', sans-serif;
        background-color: #00000000;
        color: black;
        margin: 15px auto;
    }

    input:focus{
        border-bottom: #568cdb 2.5px solid !important;
        outline: none;
        caret-color: var(--grey);
    }

    button {
        margin: 10px auto;

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
            margin-top: 5px;
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
</style>