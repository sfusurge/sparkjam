<script lang="ts">
    // import {getLeaderboard} from '../Firebase/SuikaLeaderboardManager'
    import { tiers } from '../Suika/SuikaController.svelte'
    import { leaderboardPreset } from './LeaderboardController.svelte'

    var leaderboard = $state(leaderboardPreset)

    export const updateLeaderboard = () => {
        fetchLeaderboard()
    }

    const fetchLeaderboard = async () => {
        try{
            // let tLeaderboard = await getLeaderboard()
            // leaderboard = tLeaderboard??leaderboard
        }catch (e){
            console.log(e)
        }
    }

    $effect(() => {
        updateLeaderboard()
    })

    const leaderBoardIcons = tiers.map((t) => {
        return t.icon
    }).toReversed()
</script>

<div id="leaderBoardComponent">
    <p style="font-size: 0.75rem; color: lightgrey;">Leaderboards coming online soon!</p>
    <p id="leaderboardHeader">( TOP 5 )</p>
    {#each leaderboard as playerScore}
        <div class="entry">
            <p class="entryName">{playerScore.username}</p>
            <p class="entryScore">SCORE: {playerScore.points}</p>
        </div>
    {/each}
</div>

<style>
    #leaderBoardComponent{
        width: 200px;
        text-overflow: clip;
        overflow: hidden;
        color: white;
        
        #leaderboardHeader{
            margin-bottom: 4rem;
        }

        .entryName{
            font-weight: 600;
        }
        
        .entryScore{
            font-weight: 100;
        }

        .entry{
            margin-bottom: 0.5rem;
        }

        p{
            text-align: left;
            font-size: small;
            text-overflow: clip;
            text-wrap-mode: nowrap;
        }
    }
</style>