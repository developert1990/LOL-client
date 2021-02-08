
import { MatchedGameType } from './../types.d';
import { getChampsData } from './getChampsData';
import { getSummonerDetailData } from './index';

import { getParticipantTiers } from './getParticipantTiers';

interface playerNameInGameType {
    [playerName: string]: string
}

interface encrypedIdInGameType {
    [encryptedSummonerId: string]: string
}

interface playChampsIdInGameType {
    [championId: string]: number
}

export interface mixedArrType {
    playerName: string;
    championId: number | string;
    encryptedSummonerId?: string;
    tier: string;
}



export const getParticipantsData = async (games: MatchedGameType[], region: string) => {

    const champsData = getChampsData();
    const players = games.map((data) => data.participantIdentities.map((innerdata) => innerdata.player.summonerName)); //players name Array
    const champsId = games.map((data) => data.participants.map((innerData) => innerData.championId));                  // players champ id Array
    const encrypedId = games.map((data) => data.participantIdentities.map((innerData) => innerData.player.summonerId));     // encryptedSummonerId in Array

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

    const encryptedIdInThreeGamesArr: encrypedIdInGameType[][] = [];

    encrypedId.map((data) => {
        const inner = data.reduce((acc: encrypedIdInGameType[], curr) => {
            const obj: playerNameInGameType = {};
            obj["encryptedSummonerId"] = curr;
            acc.push(obj);
            return acc;
        }, []);
        encryptedIdInThreeGamesArr.push(inner);
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
    });

    const deepCopyEncryped: string[][] = JSON.parse(JSON.stringify(encrypedId));





    const participantTierArr = await getParticipantTiers(deepCopyEncryped, region);


    let resultArr: any[][] = [];
    resultArr = playerNameInThreeGamesArr.map((eachGame: playerNameInGameType[], outerIndex: number) => {
        const resultInnerArr: any[] = [];
        eachGame.map((players, innerIndex: number) => {
            resultInnerArr.push({
                playerName: players.playerName,
                championId: playChampsIdInTreeGamesArr[outerIndex][innerIndex].championId,
                encryptedSummonerId: encryptedIdInThreeGamesArr[outerIndex][innerIndex].encryptedSummonerId,
                tier: participantTierArr[outerIndex][innerIndex],
            });
        })
        return resultInnerArr;
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