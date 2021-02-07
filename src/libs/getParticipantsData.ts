import { champs } from '../data';
import { MatchedGameType } from './../types.d';
import { getChampsData } from './getChampsData';

interface playerNameInGameType {
    [playerName: string]: string
}

interface playChampsIdInGameType {
    [championId: string]: number
}

export interface mixedArrType {
    playerName: string;
    championId: number | string;
}



export const getParticipantsData = (games: MatchedGameType[]) => {
    const champsData = getChampsData();
    const players = games.map((data) => data.participantIdentities.map((innerdata) => innerdata.player.summonerName)); //players name Array
    const champsId = games.map((data) => data.participants.map((innerData) => innerData.championId));                  // players champ id Array

    console.log('games', games)
    console.log('players', players)
    console.log('champsId', champsId)
    // 플레이어들 객체로
    const playerNameInThreeGamesArr: playerNameInGameType[][] = []; // players name object in Array

    players.map((data) => {

        const inner = data.reduce((acc: playerNameInGameType[], curr) => {
            const obj: playerNameInGameType = {};
            obj["playerName"] = curr;
            acc.push(obj);
            return acc;
        }, []);

        playerNameInThreeGamesArr.push(inner);
    });


    // 플레이한 챔피언 객체로
    const playChampsIdInTreeGamesArr: playChampsIdInGameType[][] = [];
    champsId.map((data) => {

        const inner = data.reduce((acc: playChampsIdInGameType[], curr) => {

            const obj: playChampsIdInGameType = {};
            if (typeof curr === "number") {
                obj["championId"] = curr;
            }
            acc.push(obj);
            return acc;

        }, []);
        playChampsIdInTreeGamesArr.push(inner);
    })


    const resultArr = playerNameInThreeGamesArr.map((eachGame: playerNameInGameType[], outerIndex: number) => {
        const resultArr: any[] = [];
        eachGame.map((players, innerIndex: number) => {
            resultArr.push({
                playerName: players.playerName,
                championId: playChampsIdInTreeGamesArr[outerIndex][innerIndex].championId
            });
        })
        return resultArr;
    });




    resultArr.map((data, index) => {
        data.map((outerData: mixedArrType) => {
            champsData.map((innerData) => {
                if (innerData.key === outerData.championId.toString()) {
                    outerData.championId = innerData.id;
                }
            })
        })
    });

    console.log('resultArr======>  ', resultArr)











    return resultArr;
}