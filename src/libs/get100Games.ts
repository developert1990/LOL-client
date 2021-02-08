import { TEST_BASE } from './../config/index';
import Axios from 'axios';
import { GameMatcheType } from './../types.d';


export const get100Games = async (accountId: string, region: string) => {
    const { data } = await Axios.get(`${TEST_BASE}/summonorById/proxy/${accountId}/${region}/matchId`);
    const matchedGames: GameMatcheType = data;
    return matchedGames;
}