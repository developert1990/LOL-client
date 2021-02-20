import React from 'react'
import { useQuery } from '../hooks';
import champs from '../data/allChamps.json';
import { ChampDetailType } from '../types';


export const ChampionDetailPage = () => {
    const query = useQuery();
    console.log('query', query.champion)
    const typedAllChampsData: any = champs;
    const allChamps: ChampDetailType[] = Object.values(typedAllChampsData.data);
    const selectedChampDetails: any = allChamps.reduce((acc: any, curr) => {
        if (curr.id === query.champion) {
            return acc = curr;
        }
        return acc;
    }, {});
    console.log('selectedChampDetails', selectedChampDetails);
    return (
        <div>
            챔프 디테일
        </div>
    )
}
