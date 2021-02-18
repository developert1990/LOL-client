import { API_BASE } from './../config/index';
import { useEffect, useState } from 'react';
import { MatchedGameType } from './../types.d';
import { getMatchHistory } from '../constants/constants';

export const use_3MatchedGames = (start: number, gameIdInfo: number[], region: string) => {
    const [matchesInfo, setMatchesInfo] = useState<MatchedGameType[]>([]);
    const matchesData: MatchedGameType[] = [];

    useEffect(() => {

        (
            async () => {
                for (let i = start; i < start + getMatchHistory; i++) {
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
    }, []);

    return matchesInfo;
}