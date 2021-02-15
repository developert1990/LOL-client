import { SummonerReduxtype } from './../types.d';
import { API_BASE } from './../config/index';
import Axios from 'axios';


export const getSummonerBasicInfo = async (summonerId: string, region: string) => {

    const { data } = await Axios.get(`${API_BASE}/summonorById/proxy/${summonerId}/${region}`);
    const summonerInfo: SummonerReduxtype = data;
    return summonerInfo;
}