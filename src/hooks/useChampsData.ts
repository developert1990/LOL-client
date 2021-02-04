import { ChampDetailType } from './../types.d';
import { useEffect, useState } from 'react';
import { champs } from '../data/index';

export const useChampsData = () => {
    const [allChampsData, setAllChampsData] = useState<ChampDetailType[]>([]);
    const champsData = champs.data;
    useEffect(() => {
        setAllChampsData(Object.values(champsData));
    }, []);

    return allChampsData;
}