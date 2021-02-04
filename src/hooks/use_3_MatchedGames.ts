import { TEST_BASE } from './../config/index';
import { useEffect, useState } from 'react';
import { MatchedGameType } from './../types.d';

export const use_3MatchedGames = (start: number, gameIdInfo: number[], region: string) => {
    const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);
    const matchesData: MatchedGameType[] = [];

    useEffect(() => {

        (
            async () => {
                console.log('gameId 쭉 뽑은걸로 matchList 3개 뽑으러 들어옴');
                for (let i = start; i < start + 3; i++) {
                    try {
                        const response = await fetch(`${TEST_BASE}/summonorById/proxy/${gameIdInfo[i]}/${region}/matchList`);
                        const data = await response.json();
                        matchesData.push(data);
                    } catch (error) {
                        return;
                    }

                }
                console.log('matchesData===================', matchesData)
                setMatchesInfo(matchesData);
            }
        )();
    }, []);

    return matchesInfo;
}