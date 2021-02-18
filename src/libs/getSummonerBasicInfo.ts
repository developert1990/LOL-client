import { SummonerReduxtype } from './../types.d';
import { API_BASE } from './../config/index';
import Axios from 'axios';


export const getSummonerBasicInfo = async (summonerId: string, region: string) => {

    const { data } = await Axios.get(`${API_BASE}/lol/summoner/v4/summoners/by-name/${summonerId}?region=${region}`);
    const summonerInfo: SummonerReduxtype = data;
    return summonerInfo;
}