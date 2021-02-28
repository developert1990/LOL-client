import { API_BASE } from '../config/index';
import { useEffect, useState } from 'react';
import { MatchedGameType } from '../types';
import { MATCHHISTORY_LENGTH } from '../config/index';

export const Use_3MatchedGames = (start: number, gameIdInfo: number[], region: string) => {
    const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);
    const matchesData: MatchedGameType[] = [];

    useEffect(() => {

        (
            async () => {
                for (let i = start; i < start + MATCHHISTORY_LENGTH; i++) {
                    try {
                        const response = await fetch(`${API_BASE}/lol/match/v4/matches/${gameIdInfo[i]}?region=${region}`);
                        const data = await response.json();
                        matchesData.push(data);
                    } catch (error) {
                        return;
                    }

                }
                setMatchesInfo(matchesData);
            }
        )();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return matchesInfo;
}