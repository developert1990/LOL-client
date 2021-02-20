import React from 'react'
import { useQuery } from '../hooks';
import champs from '../data/allChamps.json';
import { ChampDetailType } from '../types';
import { ChampDetailPageMiddle, ChampDetailpageTop, ChampDetailPageBottom } from '../components/small_components';


export const ChampionDetailPage = () => {
    const query = useQuery();
    console.log('query', query.champion)
    const typedAllChampsData: any = champs;
    const allChamps: ChampDetailType[] = Object.values(typedAllChampsData.data);
    const selectedChampDetails: ChampDetailType = allChamps.reduce((acc: any, curr) => {
        if (curr.id === query.champion) {
            return acc = curr;
        }
        return acc;
    }, {});

    console.log('selectedChampDetails', selectedChampDetails);
    return (
        <div className="championDetailpage">
            {
                query.champion && selectedChampDetails &&
                <>
                    {console.log('query..?', query)}
                    <ChampDetailpageTop selectedChampDetails={selectedChampDetails} />
                    <ChampDetailPageMiddle selectedChampDetails={selectedChampDetails} />
                    <ChampDetailPageBottom selectedChampDetails={selectedChampDetails} />
                </>
            }
        </div>
    )
}
