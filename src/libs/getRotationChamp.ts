import axios from 'axios';
import { API } from '../config';
import { ChampDetailType, RotationChampEachType, RotationChampType } from '../types';
import { getChampsData } from './getChampsData';

export const getRotationChamp = async (region: string) => {

    const { data } = await axios.get(`${API.GET_CHAMP_ROTATION}?region=${region}`);
    const typedData: RotationChampType = data;

    const allChamps = getChampsData();

    const freeChampForAll = typedData.freeChampionIds.reduce((acc: RotationChampEachType[], curr) => {
        allChamps.map((champ: ChampDetailType) => {
            if (Number(champ.key) === curr) {
                acc.push({
                    id: champ.id,
                    name: champ.name,
                    tags: champ.tags,
                })
            }
            return acc;
        });
        return acc;
    }, []);

    const freeChampForNew = typedData.freeChampionIdsForNewPlayers.reduce((acc: RotationChampEachType[], curr) => {
        allChamps.map((champ: ChampDetailType) => {
            if (Number(champ.key) === curr) {
                acc.push({
                    id: champ.id,
                    name: champ.name,
                    tags: champ.tags,
                })
            }
            return acc;
        });
        return acc;
    }, [])

    const freeChamps = { freeChampForAll, freeChampForNew }

    return freeChamps;

}