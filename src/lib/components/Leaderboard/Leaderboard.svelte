<script lang="ts">
    import './Leaderboard.css'
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
    <p id="leaderboardHeader">( TOP 5 )</p>
    {#each leaderboard as playerScore}
        <div class="entry">
            <p class="entryName">{playerScore.username}</p>
            <p class="entryScore">SCORE: {playerScore.points}</p>
        </div>
    {/each}
</div>