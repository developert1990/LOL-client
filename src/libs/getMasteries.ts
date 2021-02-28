/* eslint-disable array-callback-return */
import axios from 'axios';
import { API_BASE } from '../config';
import { MasteriesType, SummonerReduxtype } from '../types';
import { getChampsData } from './getChampsData';

export const getMasteries = async (summonerInfo: SummonerReduxtype, region: string) => {
    const champsData = getChampsData();
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