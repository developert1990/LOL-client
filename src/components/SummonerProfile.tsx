import React, { Dispatch, SetStateAction, } from 'react';
import { ProfilePage } from '../pages/ProfilePage';
import { SummonerDetailType, GameImageType } from '../types';
import { ErrorType } from '../reducers/types';
import { NoRankInformation } from './NoRankInformation';

interface SummonerProfileProps {
    summonerDetail?: SummonerDetailType;
    isLoading: boolean;
    hasError: ErrorType | null;
    information: GameImageType[];
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    setLoadMore: Dispatch<SetStateAction<boolean>>;
    loadMore: boolean;
}

export const SummonerProfile: React.FC<SummonerProfileProps> = ({ summonerDetail, isLoading, hasError, information, loadMore, setLoadMore, setStart, start }) => {

    return (
        summonerDetail ?
            <ProfilePage summonerDetail={summonerDetail} getSummonerDetailLoading={isLoading} information={information} start={start} setStart={setStart} loadMore={loadMore} setLoadMore={setLoadMore} /> :
            <NoRankInformation hasError={hasError} />
    )
}