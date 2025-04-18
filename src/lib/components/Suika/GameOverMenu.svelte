<script lang="ts">
    // import {updateLeaderboard} from '../Firebase/SuikaLeaderboardManager'
    import {anonymousAliases} from './SuikaController.svelte'
    import sparkles from './sparkles.png'

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
    <p>FINAL SCORE: {points}</p>
    <br/>
    <input type="text" placeholder="Your Name" bind:value={userName}/>
    <br/>
    <button onclick={() => finishRound()}><img src={sparkles}>Play Again</button>
</div>