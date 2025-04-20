import { getFbDoc, retrieveFbDoc, setFbDoc } from "./SuikaFirebaseManager";

export interface LeaderboardPosition{
    username: string;
    points: number;
}

const leaderboardReadSize = 5
const leaderboardWriteSize = 10
const lBoardFbDocId = getFbDoc("suika", "pre-jam-phase")

export const getLeaderboard = async () => 
{
    const leaderboardDoc = await retrieveFbDoc(lBoardFbDocId)

    if(!leaderboardDoc.exists){
        console.log("LEADERBOARD RETRIEVAL ERROR")
        return
    }

    const ents = leaderboardDoc.data();

    if(ents == undefined){
        console.log("LEADERBOARD DATA EMPTY")
        return
    }
    
    const leaderboard : LeaderboardPosition[] = []

    for(let i = 1; i <= leaderboardReadSize; i++){
        if(ents[`pts${i}`] == undefined){
            break;
        }
        leaderboard.push({username: ents[`user${i}`], points: ents[`pts${i}`]})
    }

    leaderboard.sort(function(a,b){return (b.points-a.points)})

    console.log("retrieval...")

    return leaderboard
}

export const updateLeaderboard = async (newEntry: LeaderboardPosition) => 
{
    let lb = await getLeaderboard()
    if(lb == undefined){
        return
    }
    let leaderboard : LeaderboardPosition[] = lb
    if(leaderboard.length == leaderboardWriteSize){
        if(newEntry.points < leaderboard[leaderboard.length - 1].points){
            return
        }else{
            leaderboard.pop()
        }
    }
    let added = false
    for(let pos = 0; pos < leaderboard.length; pos++){
        if(newEntry.points > leaderboard[pos].points){
            leaderboard.splice(pos, 0, newEntry);
            added = true
            break
        }
    }
    if(!added){
        leaderboard.push(newEntry)
    }
    
    let data: Record<string, any> = {};
    for (let i = 1; i <= leaderboardWriteSize && i <= leaderboard.length; i++){
        data[`user${i}`] = leaderboard[i - 1].username
        data[`pts${i}`] = leaderboard[i - 1].points
    }
    setFbDoc(lBoardFbDocId, data)
    return await getLeaderboard()
}