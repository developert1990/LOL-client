import { API_BASE } from './../config/index';
import Axios from 'axios';
import { GameMatcheType } from './../types.d';


export const get100Games = async (accountId: string, region: string) => {
    const { data } = await Axios.get(`${API_BASE}/lol/match/v4/matchlists/by-account/${accountId}?region=${region}`);
    const matchedGames: GameMatcheType = data;
    return matchedGames;
}