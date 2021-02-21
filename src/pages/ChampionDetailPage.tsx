import React from 'react'
import { useQuery } from '../hooks';
import { ChampDetailType } from '../types';
import { ChampDetailPageMiddle, ChampDetailpageTop, ChampDetailPageBottom } from '../components/small_components';
import { getChampsData } from '../libs';


export const ChampionDetailPage = () => {
    const query = useQuery();
    console.log('query', query.champion)
    const allChamps = getChampsData();
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
