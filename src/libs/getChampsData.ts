import { ChampDetailType } from '../types';
import { champs } from '../data/index';

export const getChampsData = () => {
    const champsData = champs.data;
    const allChampsData: ChampDetailType[] = Object.values(champsData);
    return allChampsData;
}