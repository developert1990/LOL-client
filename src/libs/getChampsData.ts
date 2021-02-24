import { ChampDetailType } from '../types';
import allChamps from '../data/allChamps.json';



export const getChampsData = () => {
    const typedAllChamps: any = allChamps;
    console.log('allChamps', typedAllChamps.data)
    const allChampsData: any[] = Object.values(typedAllChamps.data);
    return allChampsData;
}