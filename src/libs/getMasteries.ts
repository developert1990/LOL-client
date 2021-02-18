import axios from 'axios';
import { API_BASE } from '../config';
import { MasteriesType, SummonerReduxtype } from '../types';
import { champs } from '../data/lolChamps';

export const getMasteries = async (summonerInfo: SummonerReduxtype, region: string) => {
    const champsData = Object.values(champs.data);
    const { id } = summonerInfo;

    const { data } = await axios(`${API_BASE}/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?region=${region}`);

    const allMasteriesData: MasteriesType[] = data

    allMasteriesData.map((data) => {
        champsData.map((innerData) => {
            if (data.championId === Number(innerData.key)) {
                data.championId = innerData.id;
            }
        })
    })

    return allMasteriesData;
}