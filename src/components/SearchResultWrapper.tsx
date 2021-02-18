import React from 'react';
import { ProfileMenu } from '../components/index';
import { Route } from 'react-router-dom';
import { ProfilePage } from '../pages/ProfilePage';
import { useSelector } from 'react-redux';
import { initialAppStateType } from '../store';
import { Masteries } from '../components/Masteries';
import { SummonerDetailType } from '../types';
import { ErrorType } from '../reducers/types';

interface SummonerProfileProps {
    summonerDetail?: SummonerDetailType;
    isLoading: boolean;
    hasError: ErrorType | null;
}

const SummonerProfile: React.FC<SummonerProfileProps> = ({ summonerDetail, isLoading, hasError }) => {
    return (
        summonerDetail ?
            <ProfilePage summonerDetail={summonerDetail} getSummonerDetailLoading={isLoading} /> : <NoRankInformation hasError={hasError} />
    )
}

const NoRankInformation = ({ hasError }: { hasError: ErrorType | null }) => {
    return hasError ? <div style={{ color: "red" }}>{hasError.message}</div> : null;
}

export const SearchResultWrapper = () => {
    const { isLoading, error, summonerDetail } = useSelector((state: initialAppStateType) => state.getSummonerDetailStore);
    return (
        <div className="searchWrapper">
            <Route path="/search/userInfo/" component={ProfileMenu} />
            <Route path="/search/userInfo/overview/:region" render={() => <SummonerProfile summonerDetail={summonerDetail} isLoading={isLoading} hasError={error} />} />
            <Route path="/search/userInfo/masteries/:region" component={Masteries} />
        </div>
    )
}
